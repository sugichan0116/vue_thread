import {loader, postDoc} from "./config.js";


var fire = new Vue({
    el: '#main',
    data: {
        snap: undefined,
        // docs: [{ name: "none", content:"loading" }],
    },
    methods: {
        docs: function () {
            if(this.snap === undefined) {
                return [{ name: "none", content:"loading" }];
            }

            return this.snap.docs.map(d => {
                return {name: d.id, content: d.data()};
            })
        }
    }
})

new Vue({
    el: '#form',
    data: {
        comment: "",
    },
    methods: {
        post: function () {
            if(this.comment === "") return;

            console.log("post", this.comment);

            postDoc(this.comment)
                .then(function (){
                    console.log("done.")
                });

            this.comment = "";
        }
    }
})


// const list = (await loader())['list'];
// fire.docs = list;

fire.snap = (await loader())['snap']