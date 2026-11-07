
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Session from "../models/session.model.js";

function getCookieOptions() {
  const isProduction = process.env.NODE_ENV === "production";

  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };
}

function getClearCookieOptions() {
  const isProduction = process.env.NODE_ENV === "production";

  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    path: "/",
  };
}

function getJwtSecret() {
  const secret = process.env.JWT_SECRET_KEY;

  if (!secret) {
    throw new Error("JWT_SECRET_KEY is not configured");
  }

  return secret;
}

function generateAccessToken(user) {
  return jwt.sign(
    {
      username: user.username,
      userId: user._id,
      type: "access",
    },
    getJwtSecret(),
    { expiresIn: "15m" }
  );
}

function generateRefreshToken(user) {
  return jwt.sign(
    {
      username: user.username,
      userId: user._id,
      type: "refresh",
    },
    getJwtSecret(),
    { expiresIn: "7d" }
  );
}

async function findSessionForRefreshToken(userId, refreshToken) {
  const activeSessions = await Session.find({
    userId,
    revoked: false,
  });

  for (const session of activeSessions) {
    if (await bcrypt.compare(refreshToken, session.refreshTokenHash)) {
      return session;
    }
  }

  return null;
}

// REGISTER
export async function Register(req, res) {
  try {
    let { username, email, password } = req.body;

    username = username?.trim();
    email = email?.trim().toLowerCase();

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Username, email and password are required",
      });
    }

    if (username.length < 4 || username.length > 20) {
      return res.status(400).json({
        message: "Username must be between 4 and 20 characters",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must contain at least 8 characters",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Please enter a valid email address",
      });
    }

    const isUserExist = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (isUserExist) {
      return res.status(409).json({
        message: "Username or email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const safeUser = await User.findById(user._id).select("-password");
    const AccessToken = generateAccessToken(user);
    const RefreshToken = generateRefreshToken(user);
    const refreshTokenHash = await bcrypt.hash(RefreshToken, 10);

    await Session.create({
      userId: user._id,
      refreshTokenHash,
    });

    res.cookie("refreshToken", RefreshToken, getCookieOptions());

    return res.status(201).json({
      message: "User registered successfully",
      user: safeUser,
      AccessToken,
    });

  } catch (error) {
    console.log("Register Error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        message: "Username or email already exists",
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}


// LOGIN
export async function Login(req, res) {
  try {
    const username = req.body.username?.trim();
    const password = req.body.password;

    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password are required",
      });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }

    const AccessToken = generateAccessToken(user);
    const RefreshToken = generateRefreshToken(user);

    const RefreshTokenHash = await bcrypt.hash(RefreshToken, 10);

    await Session.create({
      userId: user._id,
      refreshTokenHash: RefreshTokenHash,
    });

    res.cookie("refreshToken", RefreshToken, getCookieOptions());

    return res.status(200).json({
      message: "User logged in successfully",
      AccessToken,
    });

  } catch (error) {
    console.error("Login Error:", error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}


// REFRESH ACCESS TOKEN
export async function Refresh(req, res) {
  try {
    const RefreshToken = req.cookies?.refreshToken;

    if (!RefreshToken) {
      return res.status(401).json({
        message: "Refresh token missing",
      });
    }

    const decoded = jwt.verify(
      RefreshToken,
      getJwtSecret()
    );

    if (decoded.type !== "refresh") {
      return res.status(401).json({
        message: "Invalid refresh token",
      });
    }

    const userSession = await findSessionForRefreshToken(
      decoded.userId,
      RefreshToken
    );

    if (!userSession) {
      return res.status(401).json({
        message: "Session not found or expired",
      });
    }

    const user = await User.findById(decoded.userId);

    if (!user) {
      userSession.revoked = true;
      await userSession.save();

      return res.status(401).json({
        message: "User account not found",
      });
    }

    const NewAccessToken = generateAccessToken(user);
    const NewRefreshToken = generateRefreshToken(user);

    const NewRefreshTokenHash = await bcrypt.hash(
      NewRefreshToken,
      10
    );

    const updateResult = await Session.updateOne(
      {
        _id: userSession._id,
        refreshTokenHash: userSession.refreshTokenHash,
        revoked: false,
      },
      { $set: { refreshTokenHash: NewRefreshTokenHash } }
    );

    if (updateResult.modifiedCount !== 1) {
      return res.status(401).json({
        message: "Refresh token has already been used",
      });
    }

    res.cookie(
      "refreshToken",
      NewRefreshToken,
      getCookieOptions()
    );

    return res.status(200).json({
      message: "New access token generated successfully",
      NewAccessToken,
    });

  } catch (error) {
    console.log("Refresh Error:", error);

    res.clearCookie(
      "refreshToken",
      getClearCookieOptions()
    );

    return res.status(401).json({
      message: "Session expired. Please login again",
    });
  }
}


// LOGOUT
export async function Logout(req, res) {
  try {
    const RefreshToken = req.cookies?.refreshToken;

    if (!RefreshToken) {
      res.clearCookie(
        "refreshToken",
        getClearCookieOptions()
      );

      return res.status(200).json({
        message: "User already logged out",
      });
    }

    const decoded = jwt.verify(
      RefreshToken,
      getJwtSecret()
    );

    if (decoded.type !== "refresh") {
      return res.status(401).json({
        message: "Invalid refresh token",
      });
    }

    const userSession = await findSessionForRefreshToken(
      decoded.userId,
      RefreshToken
    );
    if (!userSession) {
      res.clearCookie("refreshToken", getClearCookieOptions());
      return res.status(401).json({
        message: "Refresh token is not valid",
      });
    }

    userSession.revoked = true;
    await userSession.save();

    res.clearCookie(
      "refreshToken",
      getClearCookieOptions()
    );

    return res.status(200).json({
      message: "User logged out successfully",
    });

  } catch (error) {
    console.log("Logout Error:", error);

    res.clearCookie(
      "refreshToken",
      getClearCookieOptions()
    );

    return res.status(401).json({
      message: "Session expired",
    });
  }
}


// LOGOUT FROM ALL DEVICES
export async function LogoutAll(req, res) {
  try {
    const RefreshToken = req.cookies?.refreshToken;

    if (!RefreshToken) {
      return res.status(401).json({
        message: "Refresh token missing",
      });
    }

    const decoded = jwt.verify(
      RefreshToken,
      getJwtSecret()
    );

    if (decoded.type !== "refresh") {
      return res.status(401).json({
        message: "Invalid refresh token",
      });
    }

    const userSession = await findSessionForRefreshToken(
      decoded.userId,
      RefreshToken
    );

    if (!userSession) {
      return res.status(401).json({
        message: "Session not found",
      });
    }

    await Session.updateMany(
      {
        userId: decoded.userId,
        revoked: false,
      },
      {
        $set: { revoked: true },
      }
    );

    res.clearCookie(
      "refreshToken",
      getClearCookieOptions()
    );

    return res.status(200).json({
      message: "Logged out from all devices successfully",
    });

  } catch (error) {
    console.log("Logout All Error:", error);

    res.clearCookie(
      "refreshToken",
      getClearCookieOptions()
    );

    return res.status(401).json({
      message: "Session expired",
    });
  }
}



export async function GetCurrentUser(req, res) {
  try {
    const userId = req.user.userId;

    const user = await User.findById(userId)
      .select("username email createdAt");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "Current user fetched successfully",
      user,
    });

  } catch (error) {
    console.error("GetCurrentUser Error:", error);

    return res.status(500).json({
      message: "Unable to fetch current user",
    });
  }
}
