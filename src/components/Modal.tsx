import { FC, ReactNode } from "react";
import { useStore } from "../store";

interface IProps {
    status: boolean;
    children: ReactNode
}
export const Modal: FC<IProps> = ({ status, children }) => {
    const { darkMode } = useStore((s) => s)
    const backgroundColor = darkMode ? ' bg-[#262B3C] ' : ' bg-[#f3f3f3e3] '
    const splash = darkMode ? ' bg-[#262b3ce3] ' : ' bg-[#f3f3f3e3] '
    const border = darkMode ? ' border-[#939B9F] ' : ' border-[#000000] '
    return (
        <>

            {status && <div className={` w-full h-full fixed top-0 left-0 p-10 ${splash}  z-50 flex justify-center items-center `}>
                <div className={`w-[500px] min-h-[100px] ${backgroundColor} relative rounded-[15px] border ${border}  p-11 flex flex-col gap-8`}>
                    {children}
                </div>
            </div>}


        </>
    )
}