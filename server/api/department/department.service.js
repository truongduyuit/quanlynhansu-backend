import {Department} from './department.model'

class DepartmentService {
    async create(data, options = {}) {
        const department = new Department(data)
        const doc = await department.save(options)
        return doc
    }

    async getById(id, select = null) {
        const doc = await Department.findById(id, select).lean()
        return doc
    }

    async getByQuery(query, page = null, limit = null, sort = null, options = {}) {
        if (page && limit) {
            page = parseInt(page)
            limit = parseInt(limit)
            const docs = await Department.find(query, options)
                                        .sort(sort)
                                        .skip(page*limit)
                                        .limit(limit)
                                        .lean()
            const count = await Department.find(query).countDocuments()
            return {
                data: docs,
                totalPage: Math.ceil(count/limit),
                totalRecord: count
            }
        } else {
            const docs = await Department.find(query, options).sort(sort).lean()
            return {
                data: docs
            }
        }
    }

    async getOne(query, select = null) {
        const doc = await Department.findOne(query, select).lean()
        return doc
    }

    async updateOne(query, data, options = {}) {
        const doc = await Department.updateOne(query, data, {
            ...options,
            new: true
        }).lean()
        return doc
    }

    async updateById(id, data, options = {}) {
        const doc = await Department.findByIdAndUpdate(id, data, {
            ...options,
            new: true
        }).lean()
        return doc
    }

    async populate(
        query = null,
        populate = {
            match: null,
            path: null,
            select: null,
            options: null
        },
        sort = null,
        select = null,
        page = null, limit = null
    ) {
        if (page && limit) {
            page = parseInt(page)
            limit = parseInt(limit)

            const docs = await Department.find(query)
                                        .populate(populate)
                                        .select(select)
                                        .sort(sort)
                                        .skip(page*limit)
                                        .limit(limit)
                                        .exec()
            const count = await Department.find(query).countDocuments()
            return {
                data: docs,
                totalPage: Math.ceil(count/limit),
                totalRecord: count
            }
        } else {
            const docs = await Department.find(query)
                                        .populate(populate)
                                        .select(select)
                                        .sort(sort)
                                        .exec()
            return {
                data: docs
            }
        }
    }
}

export default new DepartmentService()