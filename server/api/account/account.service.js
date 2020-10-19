import {Account} from './account.model'

class AccountService {
    async create(data, options = {}) {
        const account = new Account(data)
        const doc = await account.save(options)
        return doc
    }

    async getById(id, select = null) {
        const doc = await Account.findById(id, select).lean()
        return doc
    }

    async getByQuery(query, page = null, limit = null, sort = null, options = {}) {
        if (page && limit) {
            page = parseInt(page)
            limit = parseInt(limit)
            const docs = await Account.find(query, options)
                                        .sort(sort)
                                        .skip(page*limit)
                                        .limit(limit)
                                        .lean()
            const count = await Account.find(query).countDocuments()
            return {
                data: docs,
                totalPage: Math.ceil(count/limit),
                totalRecord: count
            }
        } else {
            const docs = await Account.find(query, options).sort(sort).lean()
            return {
                data: docs
            }
        }
    }

    async getOne(query, select = null) {
        const doc = await Account.findOne(query, select).lean()
        return doc
    }

    async updateOne(query, data, options = {}) {
        const doc = await Account.updateOne(query, data, {
            ...options,
            new: true
        }).lean()
        return doc
    }

    async updateById(id, data, options = {}) {
        const doc = await Account.findByIdAndUpdate(id, data, {
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

            const docs = await Account.find(query)
                                        .populate(populate)
                                        .select(select)
                                        .sort(sort)
                                        .skip(page*limit)
                                        .limit(limit)
                                        .exec()
            const count = await Account.find(query).countDocuments()
            return {
                data: docs,
                totalPage: Math.ceil(count/limit),
                totalRecord: count
            }
        } else {
            const docs = await Account.find(query)
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

export default new AccountService()