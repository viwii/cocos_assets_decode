module.exports = {
    drawConf: {
        0: [ {
            type: "text",
            text: "{rank}",
            layout: {
                fillStyle: "#ffffff",
                textAlign: "left",
                textBaseline: "middle",
                font: "32px Helvetica"
            },
            position: {
                left: 50,
                top: 38,
                width: 100
            }
        }, {
            type: "text",
            text: "{nickname}",
            textLength: 12,
            layout: {
                fillStyle: "#ffffff",
                textAlign: "center",
                textBaseline: "middle",
                font: "28px Helvetica"
            },
            position: {
                left: 310,
                top: 38,
                width: 200
            }
        }, {
            type: "text",
            text: "{func:formatDan}",
            layout: {
                fillStyle: "#ffffff",
                textAlign: "center",
                textBaseline: "middle",
                font: "28px Helvetica"
            },
            position: {
                left: 490,
                top: 38,
                width: 270
            }
        }, {
            type: "image",
            src: "{avatarUrl}",
            position: {
                left: 136,
                top: 12,
                width: 56,
                height: 56
            }
        } ]
    }
};