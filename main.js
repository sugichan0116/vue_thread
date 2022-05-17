import {
    collection_ref,
    postDoc,
    uploadImage,
} from "./config.js";

import {
    query,
    orderBy,
    endAt,
    limit,
    onSnapshot,
} from "https://www.gstatic.com/firebasejs/9.8.0/firebase-firestore.js";


/// vue components
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
        has_image: function (doc) {
            return doc.content.image_path
        }
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
        image_path: "",
        image_uploading: false,
    },
    methods: {
        post: function () {
            this.post_log = "";
            if(this.comment === "" && image_path == "") {
                this.post_log = "メッセージを入力してね！"
                return;
            }
            if(this.image_uploading) {
                this.post_log = "画像をアップロード中だよ！"
                return;
            }

            this.comment.replace(/\n/g,'\\n');

            console.log("post", this.comment);

            postDoc(this.author, this.comment, this.image_path)
                .then(function (){
                    console.log("done.")
                });

            //init
            this.comment = "";
            this.image_path = "";
            document.getElementById('input_file').value = ''
        },
        awake_form: function () {
            this.show_form = true;
        },
        upload: function (e) {
            const image = e.target.files[0];
            if(image == null) return;

            const allowExtensions = /.(jpeg|jpg|png|bmp|gif|heic|heif|hevc)$/i; // 許可する拡張子
            if (!image.name.match(allowExtensions)) {
                this.post_log = "〇ろすぞ"
                document.getElementById('input_file').value = ''
                return;
            }

            this.image_uploading = true;
            uploadImage(image.name, (url) => {
                console.log(this);

                this.image_path = url;
                this.image_uploading = false;
            });
        },
    }
});

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
            loader(page);
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


/// methods
const loader = (function() {
    const publish_query = function (ref, page, order=10) {
        return query(
            ref,
            orderBy("date", "desc"),
            endAt((page - 0) * order),
            limit(order * page),
        );
    }

    let unsubscribe = undefined;

    return function (callback) {
        if(unsubscribe !== undefined) unsubscribe();

        const query = publish_query(collection_ref, pagination.page);

        unsubscribe = onSnapshot(query, function (snap) {
            console.log("load snap");
            fire.snap = snap;
            fire.count = snap.size;
        });
    };
})();


// initial comment load
loader();
