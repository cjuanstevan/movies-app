import { Slot } from "@radix-ui/react-slot"
import { ExclamationCircleIcon } from "@heroicons/react/16/solid";

type Props = {
    message: string
}

function ErrorAlert({ message }: Props) {
    return (
        <Slot>
            <div className="flex min-h-full items-center justify-center bg-transparent">
                <div className="rounded-lg bg-gray-950 px-16 py-10">
                    <div className="flex justify-center">
                        <div className="rounded-full bg-gray-800 p-6">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500 p-4">
                                <ExclamationCircleIcon />
                            </div>
                        </div>
                    </div>
                    <h3 className="my-4 text-center text-3xl font-semibold text-gray-200">Oops!</h3>
                    <p className="w-[400px] text-center font-normal text-gray-200">{message}</p>
                </div>
            </div>
        </Slot>
    );
}

export { ErrorAlert }