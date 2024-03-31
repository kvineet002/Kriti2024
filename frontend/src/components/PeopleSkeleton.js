import React from 'react'

function PeopleSkeleton() {
    function OneSkeleton() {
        return (
            <div className="border  bg-opacity-10 flex justify-between items-center bg-gray-300 before:opacity-40 rounded-lg p-4 gap-4 animate-pulse">
                <div className=" flex h-full w-full gap-4">
                    <div className=" p-6 bg-opacity-20 bg-gray-300 before:opacity-50 rounded-full animate-pulse "></div>
                    <div className=" flex flex-col w-full h-full gap-2">
                        <div className="md:w-[40%] w-[80%] h-5 bg-gray-300 bg-opacity-30 rounded-full animate-linear"></div>
                        <div className="md:w-[30%] w-[60%] h-5 bg-gray-300 bg-opacity-25 rounded-full animate-linear"></div>
                    </div>
                </div>
                <div className=" h-8 px-8 md:px-12 bg-gray-300 bg-opacity-25 rounded-full animate-linear"></div>
                {/* Placeholder for Additional Info */}
            </div>
        );
    }

    return (
        <div className="h-full  flex flex-col gap-4">
            {/* Skeleton Loading */}
            {Array.from({ length: 10 }).map((_, index) => (
                <OneSkeleton key={index} />
            ))}
        </div>
    );
}

export default PeopleSkeleton
