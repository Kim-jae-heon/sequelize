const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) { //init의 매개변수인 sequelize는 index.js에서 init으로 넘어온 변수.
    return super.init({
      name: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true,
      },
      age: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      married: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      comment: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    }, {
      sequelize, //index.js에서 연결객체의 역할. model과 mysql을 연결시켜주는 것.
      timestamps: false, //원래는 timestamps가 true. createdAt, updatedAt이 default이기 때문. 이번 예제에서는 사용하지 않는다.
      underscored: false, //camel기법을 _로 바꿔줌! _를 집어넣는 것을 snake case라고 함.
      modelName: 'User', //js에서 쓰는 이름
      tableName: 'users',  //db에서 쓰는 이름
      paranoid: false, //paranoid가 true면 제거한 날짜까지 추가하며 deletedAt을 true로 만듦. soft delete를 구현하는 것.
      //아래 charset과 collate는 한글 설정을 위해 필요.
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    db.User.hasMany(db.Comment, { foreignKey: 'commenter', sourceKey: 'id' });
    //foreignKey는 외래키이다. 유저 입장에서는 Comment가 남의 Model. Comment의 commenter를 참조하는 것이기에 foreignKey를 commenter로, sourceKey는 user의 id로!
  }
};