const yup = require('yup');

async function productInputMiddleware(ctx, next) {
    try {
        const postData = ctx.request.body;
        let schema = yup.object().shape({
            id: yup.number().positive().integer().required(),
            name: yup.string(),
            price: yup.number(),
            description: yup.string(),
            productType: yup.string(),
            color: yup.string(),
            image: yup.string(),
        });

        await schema.validate(postData);
        await next();
    } catch (e) {
        ctx.status = 400;
        ctx.body = {
            success: false,
            errors: e.errors,
            errorName: e.name
        }
    }

}

module.exports = productInputMiddleware;
