const Admin_Remove_Member = () => {
    const handleRemove = (e) => {
        e.preventDefault();
        console.log("Member removal confirmed");
    };

    return (
        <div className="relative z-50 w-[90%] max-w-lg rounded-3xl border border-gray-300 bg-white p-6 shadow-xl sm:p-8">
            <div className="head m-2">
                <h1 className="font-bold text-2xl lg:text-3xl">
                    Remove Member
                </h1>
                <p className="mt-2 text-gray-600">
                    Are you sure you want to remove Bilal A. from this organization?
                </p>
            </div>

            <form onSubmit={handleRemove}>
                <div className="buttons mt-6 flex justify-end gap-3">
                    <button
                        type="button"
                        className="cursor-pointer rounded-lg border-2 border-gray-400 px-5 py-2 font-semibold text-gray-600"
                    >
                        CANCEL
                    </button>

                    <button
                        type="submit"
                        className="cursor-pointer rounded-lg bg-red-600 px-5 py-2 font-semibold text-white"
                    >
                        REMOVE
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Admin_Remove_Member;