// 对于树结构的一些常见操作
// 适用于符合下列数据格式的树
const TreeHelper = {
  // Tree Schema Demo
  //
  // { name: 'ROOT', id: '1', children: [
  //       { name: '图片', id: '2',
  //         children: [
  //           { name: '风景', id: '3'},
  //           { name: '自然', id: '4'},
  //           { name: '人文', id: '5',
  //             children: [
  //               { name: '美女1', id: '6' },
  //               { name: '美女2', id: '7' },
  //               { name: '未命名1', id: '8' },
  //             ],
  //           },
  //         ],
  //       },
  //       { name: '视频', id: '9' },
  //       { name: '音频', id: '10' },
  //       { name: '其他', id: '11' },
  //     ] },
  // }




  // 从树中根据id寻找的子树
  // tree 树对象
  // 需要查找的id
  findSubTreeById: (tree, id) => {
    let nodes = [tree];
    while(nodes.length > 0) {
      let children = [];
      for (let node of nodes) {
        if(node.id === id) {
          return node;
        }
        if (node.children) children = children.concat(node.children);
      }
      nodes = children;
    }
    return {};
  },

  // 向tree的某一个父节点添加子节点
  // tree 树对象
  // parentId 需要添加的父节点ID
  // newNode 新的节点对象
  // return 更新的树对象
  addNode: (tree, parentId, newNode) => {
    const parentNode = TreeHelper.findSubTreeById(tree, parentId);
    if (!parentNode.children) parentNode.children = [];
    newNode.parentId = parentId;
    parentNode.children.push(newNode);
    return tree;
  },

  // 从树中删除某个节点
  // tree 树对象
  // parendId 需要从哪个父节点删除
  // id 需要删除的节点id
  // return 更新的树对象
  deleteNode: (tree, parentId, id) => {
    const parendNode = TreeHelper.findSubTreeById(tree, parentId);
    parendNode.children = parendNode.children.filter((childNode) => {
      return childNode.id !== id;
    });
    if (parendNode.children.length === 0) delete parendNode.children;
    return tree;
  },

  // 更新某个节点信息
  // tree 树对象
  // updateId 待更新的节点id
  // newName 新的节点对象，
  // return 新的树
  updateNodeName: (tree, updateId, newName) => {
    const oldNode = TreeHelper.findSubTreeById(tree, updateId);
    oldNode.name = newName;
    return tree;
  },

  // // TODO: 复制某个节点到另一个节点下
  // copy: (tree, id, toParentId) => {
  //   const toCopyNode = TreeHelper.findSubTreeById(tree, id);
  //   const toNode = TreeHelper.findSubTreeById(tree, toId);
  //   toNode.
  //   return tree;
  // },

  // // TODO: 移动某个节点到另一个节点下
  // move: (tree, fromId, toId) => {
  //   let newTree = tree;
  //   return newTree;
  // },
  // TODO: 合并一些节点,并生成新的节点
  // merge: (tree, mergeIds, newNode, parentId) => {
  //   let newTree = tree;
  //   return newTree;
  // },

  // // TODO: 创建某个节点的快捷方式节点
  // mirror: (tree, mirrorNode, toMirrored, parentId) => {
  //   let newTree = tree;
  //   return newTree;
  // },

  // 递归将拉平的节点数据组织成Tree Schema
  // nodes :
  //  Schema: id: name: parentId:,...
  parseNodesToTrees: (nodes) => {
    let rootNodes = nodes.filter((node)=>{ // Maybe many root nodes
      return node.parentId == undefined;
    });
    let toParseNodes = rootNodes;
    while(toParseNodes.length > 0) {
      let children = [];
      toParseNodes.map((toParseNode) => {
        children = children.concat(TreeHelper.parseNode(nodes, toParseNode));
      });
      toParseNodes = children;
    }
    return rootNodes;
  },

  // 根据父节点找到在nodes 列表中的所有的子节点
  parseNode: (nodes, parentNode) => {
    let subTree = parentNode;
    const children = nodes.filter((node) => {
      return node.parentId == parentNode.id;
    });
    if (children.length > 0) subTree.children = children;
    return children;
  },

  // 对于有seqs参数的node节点，根据seqs解析所有的目录名称，按照父节点到自己点顺序排列
  // 如： seq= 1，2，3 则返回ID 分别为１,2,3的节点的名称组成的数组
  // [name1, name2, name3]，该函数在面包屑导航中用处较多
  getPathNames: (tree, node) => {
    if (!node || !node.seq) return [];
    const ids = node.seq.split(',');
    return ids.map((id)=>{
      const node = TreeHelper.findSubTreeById(tree, parseInt(id));
      if (node) return node.name;
      return '';
    });
  },

  //从node 列表中筛选跟节点
  rootFolders: (nodes) => {
    return nodes.map((node)=> {
      if (node.parentId == undefined)
        return node.id.toString();
    });
  },
};

// const testNodes = [
//   {id: 1, name: '1'},
//   {id: 2, name: '2', parentId: 1},
//   {id: 3, name: '3', parentId: 1},
//   {id: 4, name: '4', parentId: 2},
//   {id: 5, name: '5', parentId: 3},
//   {id: 6, name: '6', parentId: 2},
//   {id: 7, name: '7', parentId: 6},
// ];

// const tree = TreeHelper.parseNodesToTree(testNodes);
// // console.log(TreeHelper.addNode(tree, 1, {id: 100, name: 'newAdded'}));
// // console.log(TreeHelper.deleteNode(tree, 1, 100));
// console.log(TreeHelper.updateNodeName(tree, 1, 'updated'));
// console.log(TreeHelper.findSubTreeById(tree, 2));
export default TreeHelper;
