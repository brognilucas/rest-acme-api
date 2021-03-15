// 'use strict';
// module.exports = {
//     up: (queryInterface, Sequelize) => {
//         return queryInterface.createTable('Bills', {
//             code: {
//                 allowNull: false,
//                 primaryKey: true,
//                 type: Sequelize.STRING,
//             },

//             installationId: {
//                 allowNull: false,
//                 type: Sequelize.STRING
//             },

//             clientId: {
//                 allowNull: false,
//                 type: Sequelize.STRING
//             },

//             dueDate: {
//                 allowNull: false,
//                 type: Sequelize.DATE
//             }, 

//             readAmount: {
//                 allowNull: false,
//                 type: Sequelize.DOUBLE
//             }, 

//             billAmount: {
//                 allowNull: false,
//                 type: Sequelize.DOUBLE
//             }, 


//             readDate: {
//                 allowNull: false,
//                 type: Sequelize.DATE
//             }, 


//             createdAt: {
//                 allowNull: false,
//                 type: Sequelize.DATE,
//             },
//             updatedAt: {
//                 allowNull: false,
//                 type: Sequelize.DATE,
//             },
//         });
//     },
//     down: (queryInterface, Sequelize) => {
//         return queryInterface.dropTable('Bills');
//     },
// };
