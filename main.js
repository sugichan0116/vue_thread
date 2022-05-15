import {db, fb_fs, postDoc} from "./config.js";


const fire = new Vue({
    el: '#comments',
    data: {
        snap: undefined,
        count: -1,
    },
    methods: {
        docs: function () {
            if(this.snap === undefined) {
                return [];
            }

            return this.snap.docs.map(d => {
                return {name: d.id, content: d.data()};
            })
        }
    },
    computed: {
        loading: function () {
            return this.snap === undefined;
        }
    }
})

new Vue({
    el: '#form',
    data: {
        author: "ななしのぺんぎん",
        comment: "",
    },
    methods: {
        post: function () {
            if(this.comment === "") return;

            console.log("post", this.comment);

            postDoc(this.author, this.comment)
                .then(function (){
                    console.log("done.")
                });

            this.comment = "";
        }
    }
});

let reload = function (page) {
    console.log("error");
};

const pagination = new Vue({
    el: '#pagination',
    data: {
        page: 1,
        page_length: 1,
    },
    methods: {
        movePage: function (page) {
            console.log("move to page", page);
            // this.page = page;
            this.page++;
            reload(page);
        }
    }
});




const publish_query = function (ref, page, order=10) {
    return fb_fs.query(
        ref,
        fb_fs.orderBy("date", "desc"),
        fb_fs.endAt((page - 0) * order),
        fb_fs.limit(order * page),
    )
}

const ref = fb_fs.collection(db, "testcollection");
const loader = function (callback) {
    // fb_fs.unsubscribe();

    const query = publish_query(ref, pagination.page);
    fb_fs.onSnapshot(query, function (snap) {
        console.log("load snap");
        fire.snap = snap;
    });
};
loader();

reload = function (page) {
    loader();
}

// //count test
// fb_fs.onSnapshot(fb_fs.doc(db, "setting", "general"), (doc) => {
//     console.log("setting", doc.data());
//     console.log("setting count=", doc.data().count);
//     fire.count = doc.data().count;
// })
