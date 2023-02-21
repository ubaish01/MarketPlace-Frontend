export const avgRating = (ratings) => {
    console.log(ratings)
    var sum = 0;
    for(var i=0;i<ratings.length;i++)
    {
        sum+=ratings[i];
    }
    return sum / ratings.length;
}

export const showDate = (date) => {
    const data = date.split("T");
    const dateArray = data[0].split("-");
    var returnDate = ""+dateArray[2];

    switch (dateArray[1]) {
        case "01":
            returnDate+=" January "+dateArray[0];
            break;
        case "02":
            returnDate+=" February "+dateArray[0];
            break;
        case "03":
            returnDate+=" March "+dateArray[0];
            break;
        case "04":
            returnDate+=" April "+dateArray[0];
            break;
        case "05":
            returnDate+=" May "+dateArray[0];
            break;
        case "06":
            returnDate+=" June "+dateArray[0];
            break;
        case "07":
            returnDate+=" July "+dateArray[0];
            break;
        case "08":
            returnDate+=" August "+dateArray[0];
            break;
        case "09":
            returnDate+=" September "+dateArray[0];
            break;
        case "10":
            returnDate+=" October "+dateArray[0];
            break;
        case "11":
            returnDate+=" November "+dateArray[0];
            break;
        default:
            returnDate+=" December "+dateArray[0];
            break;
    }


    return returnDate;

}