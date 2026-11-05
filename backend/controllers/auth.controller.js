
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Session from "../models/session.model.js";

// Register Function Logic
export async function Register(req, res) {
  try {
    const { username, email, password } = req.body;

    const isUserExist = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (isUserExist) {
      return res.status(409).json({
        message: "User Already Exist !",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username: username,
      email: email,
      password: hashedPassword,
    });

    const safeUser = await User.findById(user._id).select("-password");

    res.status(201).json({
      message: "User registered Successfully",
      user: safeUser,
    });

  } catch (error) {
    console.log("Register Error:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

// Login Function Logic
export async function Login(req, res) {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({
        message: "User doesn't Exist! Please Register first",
      });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(401).json({
        message: "Invalid Password!",
      });
    }

    const AccessToken = jwt.sign(
      {
        username: user.username,
        userId: user._id,
        type: "access",
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "15m",
      }
    );

    const RefreshToken = jwt.sign(
      {
        username: user.username,
        userId: user._id,
        type: "refresh",
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );

    const RefreshTokenHash = await bcrypt.hash(RefreshToken, 10);

    await Session.create({
      userId: user._id,
      refreshTokenHash: RefreshTokenHash,
    });

    res.cookie("refreshToken", RefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "User Logged In Successfully",
      AccessToken,
    });

  } catch (error) {
    console.error("Login Error:", error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

// Refresh function logic
export async function Refresh(req, res) {
  try {
    const RefreshToken = req.cookies?.refreshToken;

    if (!RefreshToken) {
      return res.status(401).json({
        message: "Refresh Token Missing",
      });
    }

    const decoded = jwt.verify(
      RefreshToken,
      process.env.JWT_SECRET_KEY
    );

    if (decoded.type !== "refresh") {
      return res.status(401).json({
        message: "Invalid Refresh Token",
      });
    }

    const Sessions = await Session.find({
      userId: decoded.userId,
      revoked: false,
    });

    let userSession = null;

    for (const s of Sessions) {
      const isRefreshToken_Valid = await bcrypt.compare(
        RefreshToken,
        s.refreshTokenHash
      );

      if (isRefreshToken_Valid) {
        userSession = s;
        break;
      }
    }

    if (userSession === null) {
      return res.status(401).json({
        message: "Refresh Token is not Valid",
      });
    }

    const NewAccessToken = jwt.sign(
      {
        username: decoded.username,
        userId: decoded.userId,
        type: "access",
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "15m",
      }
    );

    const NewRefreshToken = jwt.sign(
      {
        username: decoded.username,
        userId: decoded.userId,
        type: "refresh",
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );

    const NewRefreshTokenHash = await bcrypt.hash(NewRefreshToken, 10);

    userSession.refreshTokenHash = NewRefreshTokenHash;
    await userSession.save();

    res.cookie("refreshToken", NewRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      message: "New Access and Refresh Token is Generated",
      NewAccessToken,
    });

  } catch (error) {
    console.log("Refresh Error:", error);

    res.clearCookie("refreshToken", { path: "/" });

    return res.status(401).json({
      message: "Session Expired. Please Login Again",
    });
  }
}

// Logout function logic
export async function Logout(req, res) {
  try {
    const RefreshToken = req.cookies?.refreshToken;

    if (!RefreshToken) {
      return res.status(401).json({
        message: "Refresh Token Missing",
      });
    }

    const decoded = jwt.verify(
      RefreshToken,
      process.env.JWT_SECRET_KEY
    );

    if (decoded.type !== "refresh") {
      return res.status(401).json({
        message: "Invalid Refresh Token",
      });
    }

    const Sessions = await Session.find({
      userId: decoded.userId,
      revoked: false,
    });

    let userSession = null;

    for (const s of Sessions) {
      const isRefreshToken_Valid = await bcrypt.compare(
        RefreshToken,
        s.refreshTokenHash
      );

      if (isRefreshToken_Valid) {
        userSession = s;
        break;
      }
    }

    if (userSession === null) {
      return res.status(401).json({
        message: "Refresh Token is not Valid",
      });
    }

    userSession.revoked = true;
    await userSession.save();

    res.clearCookie("refreshToken", { path: "/" });

    return res.json({
      message: "User Logout Successfully",
    });

  } catch (error) {
    console.log("Logout Error:", error);

    res.clearCookie("refreshToken", { path: "/" });

    return res.status(401).json({
      message: "Session Expired",
    });
  }
}

// Logout-all function logic
export async function LogoutAll(req, res) {
  try {
    const RefreshToken = req.cookies?.refreshToken;

    if (!RefreshToken) {
      return res.status(401).json({
        message: "Refresh Token Missing",
      });
    }

    const decoded = jwt.verify(
      RefreshToken,
      process.env.JWT_SECRET_KEY
    );

    if (decoded.type !== "refresh") {
      return res.status(401).json({
        message: "Invalid Refresh Token",
      });
    }

    const Sessions = await Session.find({
      userId: decoded.userId,
      revoked: false,
    });

    let isValid = false;

    for (const s of Sessions) {
      const checkToken = await bcrypt.compare(
        RefreshToken,
        s.refreshTokenHash
      );

      if (checkToken) {
        isValid = true;
        break;
      }
    }

    if (!isValid) {
      return res.status(401).json({
        message: "Refresh Token is not Valid",
      });
    }

    await Session.updateMany(
      { userId: decoded.userId, revoked: false },
      { $set: { revoked: true } }
    );

    res.clearCookie("refreshToken", { path: "/" });

    return res.json({
      message: "Logout from All devices Successfully",
    });

  } catch (error) {
    console.log("Logout All Error:", error);

    res.clearCookie("refreshToken", { path: "/" });

    return res.status(401).json({
      message: "Session Expired",
    });
  }
}
