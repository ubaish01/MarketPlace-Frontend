export const avgRating = (ratings) => {
    var sum = 0;
    for(var i=0;i<ratings.length;i++)
    {
        sum+=ratings[i];
    }
    return sum / 5;
}