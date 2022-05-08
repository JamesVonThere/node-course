

            let result = '';
            const ROWS = 7;
            const COLS = 7;
            for (let col = -COLS; col <= COLS; col++) {
                if (Math.abs(col + 1) % 2 == 1) {
                    for (let i = Math.abs(col); i >= 0; i--) {
                        result += ` `;
                    }
                    for (let star = Math.abs(col) - COLS; star < 0; star++) {
                        result += `*`;
                    }
                    result += `\n`;
                }
            }
            console.log(result);
        
    

