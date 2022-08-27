const Sequelize = require('sequelize');

module.exports = class Comment extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      comment: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW,
      },
    }, {
      sequelize,
      timestamps: false,
      modelName: 'Comment',
      tableName: 'comments',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }

  static associate(db) { //관계컬럼. 위 Comment 모델을 보면 댓글을 쓴 주체인 commentor가 없다. commentor를 지정해주는 방법을 associate로 지정해주는 방법을 사용. belongsTo일 때는 targetKey이다. target은 user이다.
    db.Comment.belongsTo(db.User, { foreignKey: 'commenter', targetKey: 'id' });
    //foreignKey는 belongsTo가 있는 Model에 column으로 추가가 된다.
  }
};