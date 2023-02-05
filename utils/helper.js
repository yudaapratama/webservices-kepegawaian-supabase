const pagingData =  (data, page, limit) => {
    const { count: totalItems, rows } = data
    const currentPage = page ? ++page : 1
    const totalPages = Math.ceil(totalItems / limit)

    return { totalItems, rows, totalPages, currentPage }
}

const pagination = (page, size) => {
    const limit = size ? +size : 100;
    const offset = page ? page * size : 0;
    return { limit, offset };
}

module.exports = {
    pagination,
    pagingData
}