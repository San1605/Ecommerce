const res = require("express/lib/response");

class Apifeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr
    }

    search() {
        const keyword = this.queryStr.keyword
            ? {
                name: {
                    $regex: this.queryStr.keyword,
                    $options: 'i', //case insensitive 
                },
            } : {

            }
        // console.log(keyword);
        this.query = this.query.find({ ...keyword })
        return this;
    }

    filter() {
        const querycopy = { ...this.queryStr } //withour reference  just the copy by spread operator
        //    console.log(querycopy);
        const removefields = ["keyword", "page", "limit"]

        removefields.forEach((key) => delete querycopy[key])
        // console.log(querycopy);



        // filter for price just we need to put $ before gt and lt opertor of mongodb 
        // console.log(querycopy);
        let queryStr = JSON.stringify(querycopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`)


        this.query = this.query.find(JSON.parse(queryStr))

        // console.log(queryStr);
        return this;
    }




    // .page == page=={}
    pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;

        const skip = resultPerPage * (currentPage - 1);

        this.query = this.query.limit(resultPerPage).skip(skip)
        return this
    }

}


module.exports = Apifeatures