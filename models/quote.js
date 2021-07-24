module.exports = (sequelize, DataTypes) => {
    const Quote = sequelize.define('Quote', {
        author: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            },
        },
        quote: {
            type: DataTypes.TEXT, 
            allowNull: false,
            validate: {
                len: [1],
            },
        },
    })

    return Quote;
}