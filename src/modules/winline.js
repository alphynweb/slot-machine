'use strict';

const winline = (itemInfo) => {
    let imageSrc;
    let type;
    let winAmount;
    let winLineItem;
    let winLineWinAmount;
    let winLineAmountContent;
    return {
        container: document.getElementById('winLines'),
        winLine: null,
        build: function () {
            this.type = itemInfo.type;
            this.imageSrc = itemInfo.imageSrc;
            this.winAmount = itemInfo.winAmount;
        },
        displayWin: function() {
            this.winLine.classList.add('active');
        },
        removeWin: function() {
            this.winLine.classList.remove('active');
        },
        render: function () {
            this.winLine = document.createElement('div');
            this.winLine.classList.add('winline');

            // Build images
            for (let i = 0; i < NO_REELS; i++) {
                winLineItem = document.createElement('img');
                winLineItem.src = './img/' + this.imageSrc;
                this.winLine.appendChild(winLineItem);
            };

            // Build win amount
            winLineWinAmount = document.createElement('div');
            winLineWinAmount.classList.add('win-amount');

            winLineAmountContent = document.createElement('span');
            winLineAmountContent.innerHTML = this.winAmount;

            winLineWinAmount.appendChild(winLineAmountContent);
            this.winLine.appendChild(winLineWinAmount);


            this.container.appendChild(this.winLine);
        }
    }
};

export default winline;