angular.module('sdk.services')

// DB wrapper
.factory('$WebSQL', function($q, DB_CONFIG, $log) {
    var self = this;
    self.db = null;
    
    var createSchema = function() {
        angular.forEach(DB_CONFIG.tables, function(table) {
            var columns = [];
 
            angular.forEach(table.columns, function(column) {
                columns.push(column.name + ' ' + column.type);
            });
 
            var query = 'CREATE TABLE IF NOT EXISTS ' + table.name + ' (' + columns.join(',') + ')';
            self.query(query);
            $log.debug('Table ' + table.name + ' initialized');
        });
    };

    var clearSchema = function(){
        angular.forEach(DB_CONFIG.tables, function(table) {
 
            var query = 'DROP TABLE ' + table.name;
            self.query(query);
            $log.debug('Table ' + table.name + ' dropped');
        });
    };

    self.clearSchema  = function(){
        clearSchema();
        createSchema();
    };

    self.init = function() {
        // Use self.db = window.sqlitePlugin.openDatabase({name: DB_CONFIG.name}); in production
        //self.db = window.openDatabase(DB_CONFIG.name, '1.0', 'database', 40 * 1024 * 1023);
        
        if (window.sqlitePlugin){
            self.db = window.sqlitePlugin.openDatabase({name: DB_CONFIG.name});
        }else if (window.openDatabase){
            self.db = window.openDatabase(DB_CONFIG.name, '1.0', 'database', 40 * 1024 * 1023);
        }

        createSchema();
    };
    
    self.insertAll = function(tableName, data) {
        var columns = [],
            bindings = [];
        var deferred = $q.defer();
        var table = _.first(_.where(DB_CONFIG.tables, {name: tableName}));

        for (var columnName in table.columns) {
            columns.push(table.columns[columnName].name);
            bindings.push('?');
        }

        var sql = 'INSERT INTO ' + tableName + ' (' + columns.join(', ') + ') VALUES (' + bindings.join(', ') + ')';


        for (var i = 0; i < data.length; i++) {
            var values = [];
            for (var j = 0; j < columns.length; j++) {
                values.push(data[i][columns[j]]);
            }

            self.query(sql, values).success(function(){});
        }
    };

    self.insert = function(tableName, data) {
        var columns = [],
            bindings = [];

        var deferred = $q.defer();
        var table = _.first(_.where(DB_CONFIG.tables, {name: tableName}));

        for (var columnName in table.columns) {
            columns.push(table.columns[columnName].name);
            bindings.push('?');
        }

        var sql = 'INSERT INTO ' + tableName + ' (' + columns.join(', ') + ') VALUES (' + bindings.join(', ') + ')';

        var values = [];
        for (var j = 0; j < columns.length; j++) {
            values.push(data[columns[j]]);
        }

        self.db.transaction(function(transaction) {
            transaction.executeSql(sql, values, function(transaction, result) {
                deferred.resolve(result);
            }, function(transaction, error) {
                deferred.reject(error);
            });
        });

        return deferred.promise;
    };

    self.query = function(query, bindings) {
        bindings = typeof bindings !== 'undefined' ? bindings : [];
        var deferred = $q.defer();
 
        self.db.transaction(function(transaction) {
            transaction.executeSql(query, bindings, function(transaction, result) {
                deferred.resolve(result);
            }, function(transaction, error) {
                deferred.reject(error);
            });
        });
 
        return deferred.promise;
    };

     self.bulkQuery = function(query, values) {
        
        var deferred = $q.defer();
        var count = 1;
        
        self.db.transaction(function(transaction) {

            angular.forEach(values, function(bindings){
                var _values = [];

                for(var pair in bindings){
                    _values.push(bindings[pair]);

                }
                
                transaction.executeSql(query, _values, 
                    function(){

                        if(count === values.length){
                            deferred.resolve();
                        }

                        count++;
                    }, 
                    function(error){
                        deferred.reject(error);
                    }
                );
            });

        });
 
        return deferred.promise;
    };

 
    self.fetchAll = function(result) {
        var output = [];
 
        for (var i = 0; i < result.rows.length; i++) {
            output.push(result.rows.item(i));
        }
        
        return output;
    };
 
    self.fetch = function(result) {
        return result.rows.item(0);
    };
 
    return self;
});