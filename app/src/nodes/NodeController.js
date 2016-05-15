(function(){

  angular
    .module('nodes')
    .controller('NodeController', [
      'nodeService', '$mdSidenav', '$mdBottomSheet', '$log', '$q',
      NodeController
    ]);

  /**
   * Main Controller for the Angular Material Starter App
   * @param $scope
   * @param $mdSidenav
   * @param avatarsService
   * @constructor
   */
  function NodeController( nodeService, $mdSidenav, $mdBottomSheet, $log, $q) {
    var self = this;

    self.selected     = null;
    self.nodes        = [ ];
    self.selectNode   = selectNode;
    self.toggleList   = toggleNodesList;
    self.showContactOptions  = showContactOptions;

    // Load all registered users

    nodeService
      .loadAllNodes()
      .then( function( nodes ) {
        console.log(nodes);
        self.nodes    = [].concat(nodes);
        //self.selected = nodes[0];
      });

    // *********************************
    // Internal methods
    // *********************************

    /**
     * First hide the bottomsheet IF visible, then
     * hide or Show the 'left' sideNav area
     */
    function toggleNodesList() {
      var pending = $mdBottomSheet.hide() || $q.when(true);

      pending.then(function(){
        $mdSidenav('left').toggle();
      });
    }

    /**
     * Select the current avatars
     * @param menuId
     */
    function selectNode ( node ) {
      self.selected = angular.isNumber(node) ? $scope.nodes[node] : node;
      self.toggleList();
    }

    /**
     * Show the bottom sheet
     */
    function showContactOptions($event) {
      var node = self.selected;

      return $mdBottomSheet.show({
        parent: angular.element(document.getElementById('content')),
        templateUrl: './src/users/view/contactSheet.html',
        controller: [ '$mdBottomSheet', ContactPanelController],
        controllerAs: "cp",
        bindToController : true,
        targetEvent: $event
      }).then(function(clickedItem) {
        clickedItem && $log.debug( clickedItem.name + ' clicked!');
      });

      /**
       * Bottom Sheet controller for the Avatar Actions
       */
      function ContactPanelController( $mdBottomSheet ) {
        this.node = node;
        this.actions = [
          { name: 'Phone'       , icon: 'phone'       , icon_url: 'assets/svg/phone.svg'},
          { name: 'Twitter'     , icon: 'twitter'     , icon_url: 'assets/svg/twitter.svg'},
          { name: 'Google+'     , icon: 'google_plus' , icon_url: 'assets/svg/google_plus.svg'},
          { name: 'Hangout'     , icon: 'hangouts'    , icon_url: 'assets/svg/hangouts.svg'}
        ];
        this.submitContact = function(action) {
          $mdBottomSheet.hide(action);
        };
      }
    }

  }

})();
