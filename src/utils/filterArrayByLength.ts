import { removeAccents } from "./removeAccents"

export const filterArrayByLength = (array: string[]) => {
    const filteredArray = array.filter(ele => ele.length === 5)
    return filteredArray
}