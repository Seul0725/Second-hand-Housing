import axios from './axios';

// 注册
function register(object) {
  const obj = {
    name: object.name,
    pass: object.pass,
    identify: object.identity,
    tel: object.tel,
    disabled: '0'
  }
  const objer = {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'post',
    url: `/user/add`,
    data: obj,
  };
  return axios(objer);
}

// 登录
function login(object){
  const obj = {
    name: object.name,
    pass: object.pass,
    identify: object.identify
  }
  const objer = {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'get',
    url: `/user/find`,
    params: obj,
  };
  return axios(objer);
}

// 修改密码
function updatePass(object) {
  const obj = {
    name: object.name,
    oldPass: object.oldPass,
    newPass: object.newPass
  }
  const objer = {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'post',
    url: `/user/updatePass`,
    data: obj,
  };
  return axios(objer);
}

//是否禁止登录
function update(object) {
  const obj = {
    id: object.id,
    name: object.name,
    tel: object.tel,
    identify: object.identify,
    pass: object.pass,
    disabled: object.disabled
  }
  const objer = {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'post',
    url: `/user/update`,
    data: obj,
  };
  return axios(objer);
}

// 查找所有客户
function findAll(){
  const objer = {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'get',
    url: `/user/findAll`,
  };
  return axios(objer);
}

// 删除客户
function deleteClient(object){
  const obj = {
    id: object
  }
  const objer = {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'delete',
    url: `/user/delete`,
    params: obj
  };
  return axios(objer);
}

// 查找全部房源信息
function findAllHouseInfo(){
  const objer = {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'get',
    url: `/houseInfo/findAll`,
  };
  return axios(objer);
}

// 新增房源信息
function addHouseInfo(object){
  const obj = {
    userName: object.userName,
    community: object.community,
    city: object.city,
    type: object.type,
    area: object.area,
    price: object.price,
    unitPrice: object.unitPrice,
    tel: object.tel,
    introduce: object.introduce,
    images: object.images,
    booked: false,
    checked: '0',
    bookedName: '',
    bookedTel: '',
    ordered: '0',
    orderedName: '',
    orderedTel: '',
    status: '0'
  }
  const objer = {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'post',
    url: `/houseInfo/add`,
    data: obj
  };
  return axios(objer);
}

// 修改房源信息
function editHouseInfo(object){
  const obj = {
    id: object.id,
    userName: object.userName,
    community: object.community,
    city: object.city,
    type: object.type,
    area: object.area,
    price: object.price,
    unitPrice: object.unitPrice,
    tel: object.tel,
    introduce: object.introduce,
    images: object.images,
    booked: object.booked,
    checked: object.checked,
    bookedName: object.bookedName,
    bookedTel: object.bookedTel,
    ordered: object.ordered,
    orderedName: object.orderedName,
    orderedTel: object.orderedTel,
    status: object.status
  }
  const objer = {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'put',
    url: `/houseInfo/update`,
    data: obj
  };
  return axios(objer);
}

// 删除房源信息
function deleteHouseInfo(object){
  const obj = {
    id: object
  }
  const objer = {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'delete',
    url: `/houseInfo/delete`,
    params: obj
  };
  return axios(objer);
}

// 修改booked
function updateBooked(object){
  const obj = {
    id: object.id,
    booked: object.booked,
    bookedName: object.bookedName,
    bookedTel: object.bookedTel
  }
  const objer = {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'put',
    url: `/houseInfo/updateBooked`,
    params: obj
  };
  return axios(objer);
}

// 修改checked
function updateChecked(object){
  const obj = {
    id: object.id,
    checked: object.checked
  }
  const objer = {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'put',
    url: `/houseInfo/updateChecked`,
    params: obj
  };
  return axios(objer);
}

// 修改status
function updateStatus(object){
  const obj = {
    id: object.id,
    status: object.status
  }
  const objer = {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'put',
    url: `/houseInfo/updateStatus`,
    params: obj
  };
  return axios(objer);
}

// 修改ordered
function updateOrdered(object){
  const obj = {
    id: object.id,
    ordered: object.ordered,
    orderedName: object.orderedName,
    orderedTel: object.orderedTel
  }
  const objer = {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'put',
    url: `/houseInfo/updateOrdered`,
    params: obj
  };
  return axios(objer);
}

// 新增评论
function addComment(object){
  const obj = {
    houseInformationId: object.id,
    comment:{
      title: object.title,
      content: object.content
    }
  }
  const objer = {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'post',
    url: `/comment/addComment`,
    data: obj
  };
  return axios(objer);
}

// 通过房源id查找评论
function findComment(object){
  const obj = {
    id: object,
  }
  const objer = {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'get',
    url: `/comment/findById`,
    params: obj
  };
  return axios(objer);
}

// 删除评论
function deleteComment(object){
  const obj = {
    houseInformationId: object.id,
    commentId: object.commentId
  }
  const objer = {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'delete',
    url: `/comment/delComment`,
    data: obj
  };
  return axios(objer);
}

// 预约统计
function bookedFindAll(){
  const objer = {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'get',
    url: `/reservation/findAll`
  };
  return axios(objer);
}

// 接单统计
function orderedFindAll(){
  const objer = {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'get',
    url: `/orders/findAll`
  };
  return axios(objer);
}

export {
    register,
    login,
    updatePass,
    update,
    findAll,
    deleteClient,
    findAllHouseInfo,
    addHouseInfo,
    deleteHouseInfo,
    editHouseInfo,
    updateBooked,
    updateChecked,
    updateStatus,
    updateOrdered,
    addComment,
    findComment,
    deleteComment,
    bookedFindAll,
    orderedFindAll
}