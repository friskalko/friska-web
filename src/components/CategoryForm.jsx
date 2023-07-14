"use client";
export default function CategoryForm() {
    return (
        <>
            <form
                className="max-w-2xl mx-auto border border-gray-200 rounded-lg px-5 py-7 bg-white"
                onSubmit={(e) => e.preventDefault()}
            >
                <h1 className="text-3xl font-semibold text-center mb-4 text-gray-600">
                    Add new category
                </h1>
                <div className="flex items-center gap-2">
                    <input type="text" name="name" className="flex-1" />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-500 font-semibold"
                    >
                        Add
                    </button>
                </div>
            </form>
        </>
    );
}
