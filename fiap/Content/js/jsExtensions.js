Object.prototype.toDateNoTime = function () {
    if (this instanceof Date) {
        var dateObj = new Date(this);
        var dateWithoutTime = dateObj.toLocaleDateString();

        return dateWithoutTime;
    }
    else if (this instanceof String) {
        var arrData = this.split('/');
        var dateObj = new Date(arrData[2], arrData[1] - 1, arrData[0]);
        var dateWithoutTime = dateObj.toLocaleDateString();

        if (dateWithoutTime == 'Invalid Date')
            return this.toString();

        return dateWithoutTime;
    }
    else {
        return this;
    }
};