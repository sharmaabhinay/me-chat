export let  establish_connection = (data)=> {
    return {
        type: "ESTABLISH_CONNECTION",
        data
    }
}