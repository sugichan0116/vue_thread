import {
    collection_ref,
    postDoc
} from "./config.js";

import {
    query,
    orderBy,
    endAt,
    limit,
    onSnapshot,
} from "https://www.gstatic.com/firebasejs/9.8.0/firebase-firestore.js";


const fire = new Vue({
    el: '#comments',
    data: {
        snap: undefined,
        count: 0,
    },
    methods: {
        docs: function () {
            if(this.snap === undefined) {
                return [];
            }

            return this.snap.docs.map(d => {
                return {name: d.id, content: d.data()};
            })
        },
        toDate: function (date) {
            return (date == undefined) ? "???" : moment(date.toDate()).fromNow();
        },
    },
    computed: {
        loading: function () {
            return this.snap === undefined;
        }
    }
})

const form = new Vue({
    el: '#form',
    data: {
        author: "ななしのぺんぎん",
        comment: "",
        show_form: false,
        post_log: "",
    },
    methods: {
        post: function () {
            this.post_log = "";
            if(this.comment === "") {
                this.post_log = "メッセージを入力してね！"
                return;
            }

            this.comment.replace(/\n/g,'\\n');

            console.log("post", this.comment);

            postDoc(this.author, this.comment)
                .then(function (){
                    console.log("done.")
                });

            this.comment = "";
        },
        awake_form: function () {
            this.show_form = true;
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

const page_top = new Vue({
    el: '#page_top',
    methods: {
        scrollTop: function(){
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    }
})



const publish_query = function (ref, page, order=10) {
    return query(
        ref,
        orderBy("date", "desc"),
        endAt((page - 0) * order),
        limit(order * page),
    );
}

let unsubscribe = undefined;
const loader = function (callback) {
    if(unsubscribe !== undefined) unsubscribe();

    const query = publish_query(collection_ref, pagination.page);
    unsubscribe = onSnapshot(query, function (snap) {
        console.log("load snap");
        fire.count = snap.size;
        fire.snap = snap;
    });
};

reload = loader;

loader();
