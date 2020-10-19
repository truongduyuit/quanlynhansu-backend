import {Roles} from './role.model'

class RoleService {
    async create(data, options = {}) {
        const role = new Roles(data)
        const doc = await role.save(options)
        return doc
    }

    async getById(id, select = null) {
        const doc = await Roles.findById(id, select).lean()
        return doc
    }

    async getByQuery(query, page = null, limit = null, sort = null, options = {}) {
        if (page && limit) {
            page = parseInt(page)
            limit = parseInt(limit)
            const docs = await Roles.find(query, options)
                                        .sort(sort)
                                        .skip(page*limit)
                                        .limit(limit)
                                        .lean()
            const count = await Roles.find(query).countDocuments()
            return {
                data: docs,
                totalPage: Math.ceil(count/limit),
                totalRecord: count
            }
        } else {
            const docs = await Roles.find(query, options).sort(sort).lean()
            return {
                data: docs
            }
        }
    }

    async getOne(query, select = null) {
        const doc = await Roles.findOne(query, select).lean()
        return doc
    }

    async updateOne(query, data, options = {}) {
        const doc = await Roles.updateOne(query, data, {
            ...options,
            new: true
        }).lean()
        return doc
    }

    async updateById(id, data, options = {}) {
        const doc = await Roles.findByIdAndUpdate(id, data, {
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

            const docs = await Roles.find(query)
                                        .populate(populate)
                                        .select(select)
                                        .sort(sort)
                                        .skip(page*limit)
                                        .limit(limit)
                                        .exec()
            const count = await Roles.find(query).countDocuments()
            return {
                data: docs,
                totalPage: Math.ceil(count/limit),
                totalRecord: count
            }
        } else {
            const docs = await Roles.find(query)
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

export default new RoleService()