console.log("服装商店系统");
let store = [];
const clothes_list = [
    {
        id: "1",
        name: "白茶波点裙"
    },
    {
        id: "2",
        name: "茶棕短搭"
    },
    {
        id: "3",
        name: "柔粉蝴蝶结裙"
    },
    {
        id: "4",
        name: "夜雾多层褶裙"
    },
    {
        id: "5",
        name: "云粉白褶套装"
    },
    {
        id: "6",
        name: "浅青蝴蝶结裙"
    },
    {
        id: "7",
        name: "粉袖黑裙套"
    },
    {
        id: "8",
        name: "柔纱收腰礼裙"
    },
    {
        id: "9",
        name: "粉烟轻披汉服裙"
    },
    {
        id: "10",
        name: "米杏收腰短裙"
    },
    {
        id: "11",
        name: "奶白花饰无袖裙"
    },
    {
        id: "12",
        name: "灰调黑领甜酷裙"
    },
    {
        id: "13",
        name: "墨黑蝴蝶结轻裙"
    },
    {
        id: "14",
        name: "柔杏复古披风裙"
    },
    {
        id: "15",
        name: "云白灰带蝴蝶结裙"
    },
    {
        id: "16",
        name: "浅蓝条纹蝴蝶结裙"
    },
    {
        id: "17",
        name: "云白缠带裙"
    },
    {
        id: "18",
        name: "素白纱袖裙"
    },
    {
        id: "19",
        name: "素白斜摆裙"
    },
    {
        id: "20",
        name: "月白缎面缀饰长裙"
    }
];

function add_clothes(clothID) {
    let clothescart = null;
    for (let i = 0; i < clothes_list.length; i++) {
        if (clothes_list[i].id === clothID) {
            clothescart = clothes_list[i];
            break;
        }
    }
    if (!clothescart) {
        console.log('未找到该商品ID，看看其他的吧');
        if (statusSpan) statusSpan.textContent = "亲亲，没找到你心爱的宝贝呢 ⌯˃̶ᗜ˂̶⌯";
        return false;
    }
    let exitcloth = null;
    for (let i = 0; i < store.length; i++) {
        if (store[i].id === clothID) {
            exitcloth = store[i];
            break;
        }
    }
    if (exitcloth) {
        if (exitcloth.num === undefined) {
            exitcloth.num = 1;
        }
        exitcloth.num = exitcloth.num + 1;
        console.log(`亲亲，发现已重复购买，为你增加${exitcloth.name}的数量！现在为${exitcloth.num}件`);
        if (statusSpan) statusSpan.textContent = `亲亲，已将${exitcloth.name}的数量 +1! ⌯˃̶ᗜ˂̶⌯`;
    }
    else {
        store.push({
            id: clothID,
            name: clothescart.name,
            num: 1
        });
        console.log(`好的！已将${clothescart.name}放进购物车`);
        if (statusSpan) statusSpan.textContent = `好的！已将${clothescart.name}放进购物车 ⌯˃̶ᗜ˂̶⌯`;
    }
    renderCart(); 
    return true;
}

function add_more_cloth(clothIDS) {
    for (let i = 0; i < clothIDS.length; i++) {
        add_clothes(clothIDS[i]);
    }
    return store;
}

function delete_cloth(clothID) {
    let newCart = [];
    for (let i = 0; i < store.length; i++) {
        if (store[i].id !== clothID) {
            newCart.push(store[i]);
        }
    }
    if (newCart.length < store.length) {
        store = newCart;
        console.log("删除成功");
        if (statusSpan) statusSpan.textContent = "嘻嘻，我已经帮你删除啦 ⌯˃̶ᗜ˂̶⌯";
        renderCart(); 
        return true;
    }
    console.log("未找到你要删除的商品");
    if (statusSpan) statusSpan.textContent = "亲亲，人家好像没找到你要删除的商品 ㅠ⩊ㅠ";
    return false;
}

function updatenum(clothID, num) {
    let item = null;
    for (let i = 0; i < store.length; i++) {
        if (store[i].id === clothID) {
            item = store[i];
            break;
        }
    }
    if (item) {
        item.num = num;
        console.log(`修改${item.name}数量为${num}`);
        if (statusSpan) statusSpan.textContent = `收到你的命令，已修改${item.name}数量为${num}`;
        renderCart(); 
        return true;
    } else {
        console.log("未找到要修改的商品");
        if (statusSpan) statusSpan.textContent = "人家没找到你要修改的产品哦 ㅠ⩊ㅠ";
    }
    return false;
}

function search(keyword) {
    const results = [];
    console.log(`查询关键词: "${keyword}"`);
    for (let i = 0; i < store.length; i++) {
        const item = store[i];
        if (item.name.includes(keyword)) {
            results.push(item);
        }
    }
    if (results.length > 0) {
        console.log("找到以下商品:");
        let resultHtml = "";
        for (let i = 0; i < results.length; i++) {
            console.log(`- ${results[i].name} (数量:${results[i].num || 1})`);
            resultHtml += `<div class="cart-item" style="background:#fffbe6;">找到: ${results[i].name} (数量:${results[i].num || 1})</div>`;
        }
        if (statusSpan) statusSpan.textContent = `人家找到了 ${results.length} 个匹配商品`;
        document.getElementById('cart-display').innerHTML = resultHtml;
    } else {
        console.log("未找到相关商品");
        if (statusSpan) statusSpan.textContent = "啊偶，购物车中没找到相关商品 ㅠ⩊ㅠ";
    }
    return results;
}

function showClothList() {
    console.log("可选服装:");
    for (let i = 0; i < clothes_list.length; i++) {
        console.log(`${clothes_list[i].id}:${clothes_list[i].name}`);
    }
}

function showCart() {
    console.log("购物车:");
    for (let i = 0; i < store.length; i++) {
        if (store[i].num === undefined) {
            console.log(`${store[i].id}:${store[i].name} x1`);
        } else {
            console.log(`${store[i].id}:${store[i].name} x${store[i].num}`);
        }
    }
}

function clearCart() {
    store = [];
    console.log("购物车已清空");
    if (statusSpan) statusSpan.textContent = "已为你清空购物车 ᗜ ‸ ᗜ";
    renderCart();
}


function initPage() {
    const grid = document.getElementById('product-picture');
    clothes_list.forEach(item => {
        const card = document.createElement('div');
        card.className = 'product-card';
        const placeholderImg = `picture/${item.id}.jpg`;
        card.innerHTML = `
                <img src="${placeholderImg}" alt="${item.name}" class="product-img" id="img-${item.id}">
                <div class="product-info">
                    <div class="product-name">${item.id}.${item.name}</div>
                    <button class="add-btn" onclick="add_clothes('${item.id}')">加入购物车</button>
                </div>
            `;
        grid.appendChild(card);
    });

    renderCart();
}

function renderCart() {
    const cartDisplay = document.getElementById('cart-display');

    if (store.length === 0) {
        cartDisplay.innerHTML = '<p style="text-align:center; color:#999; padding:20px;">购物车是空的哦</p>';
        return;
    }

    let html = '';
    store.forEach(item => {
        const num = item.num || 1;
        html += `
                <div class="cart-item">
                    <div>
                        <strong>${item.name}</strong><br>
                        <small>ID: ${item.id}</small>
                    </div>
                    <div class="cart-controls">
                        x ${num}
                        <button class="btn-small btn-del" onclick="delete_cloth('${item.id}')">删除</button>
                    </div>
                </div>
            `;
    });
    cartDisplay.innerHTML = html;
}

function handleSearch() {
    const keyword = document.getElementById('search-input').value.trim();
    if (keyword) {
        search(keyword);
    }
}

function handleUpdate() {
    const id = document.getElementById('update-id').value.trim();
    const num = parseInt(document.getElementById('update-num').value);

    if (id && num > 0) {
        updatenum(id, num);
    } else {
        alert("大妈，你眼睛没瞎吧？会正确输入吗？");
    }
}

const statusSpan = document.getElementById('status-message');
window.onload = initPage;

