(function(){
  'use strict';

  angular.module('nodes')
    .service('nodeService', ['$q', '$http',  NodeService]);

  /**
   * Users DataService
   * Uses embedded, hard-coded data model; acts asynchronously to simulate
   * remote data service call(s).
   *
   * @returns {{loadAll: Function}}
   * @constructor
   */
  function NodeService($q, $http, $scope){
    var nodeList = function() {
        $http.get('/api/node.json').success(function(data) {
        return data;
      }).error(function(error) {
        q.reject(error);
      });
    }
    var nodes = nodeList();
    console.log(nodes);
    // Promise-based API
    return {
      loadAllNodes : function() {
        // Simulate async nature of real remote calls
        return $q.when(nodes);

      }
    };
  }

})();
