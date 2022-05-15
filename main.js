import {db, fb_fs, loader, postDoc} from "./config.js";


const fire = new Vue({
    el: '#main',
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
})


loader(function (snap) {
    fire.snap = snap;
})

fb_fs.onSnapshot(fb_fs.doc(db, "setting", "general"), (doc) => {
    console.log("setting", doc.data());
    console.log("setting count=", doc.data().count);
    fire.count = doc.data().count;
})
