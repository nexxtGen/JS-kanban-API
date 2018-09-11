    
    //Function generate radnom 10 length string
        function randomString() {   
            var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
            var str = '';
            for ( i = 0; i < 10; i++) {
                str += chars[Math.floor(Math.random() * chars.length)];
            }
            return str;
        }
    
        //Function for generate mustache template from html code and add this to box (<div> etc).
        //--- name- template id in html code
        //--- data - dane podstawione do szablonu
        //--- basicElement - Element w który zostanie opakowany szablon. Potrzebny do wytworzenia drzewa DOM by mieć dostęp
        //do DOM Api ponieważ Mustache.js zwraca w funkcji render string'a z zawartością szablonu!        
    
        function generateTemplate(name, data, basicElement) {
            var template = document.getElementById(name).innerHTML;
            var element = document.createElement(basicElement || 'div'); // Create random div
    
            Mustache.parse(template);
            element.innerHTML = Mustache.render(template, data)
    
            return element;      
        } 
    
        // Create All Kanban objects    
        // CREATING COLUMNS
        var ideaColumn = new Column('Ideas');
        var todoColumn = new Column('To do');
        var doingColumn = new Column('Doing');
        var doneColumn = new Column('Done');
        
        // ADDING COLUMNS TO THE BOARD
        board.addColumn(ideaColumn);
        board.addColumn(todoColumn);
        board.addColumn(doingColumn);
        board.addColumn(doneColumn);
        
        // CREATING CARDS
        var card1 = new Card('New task');
        var card2 = new Card('Create kanban boards');
        var card3 = new Card('Your Ideas');
        var card4 = new Card('Can you drop me and drag!');
        
        // ADDING CARDS TO COLUMNS
        ideaColumn.addCard(card3);
        ideaColumn.addCard(card4);
        todoColumn.addCard(card1);
        doingColumn.addCard(card2);        
    
    
   
    
    