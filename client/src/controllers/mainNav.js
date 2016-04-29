module.exports = function ($scope) {
  $scope.brand = {name: 'David Bramwell', href: '#home'};
  $scope.buttons = [{name: 'About', href: '#about'}, {name: 'Experience', href: '#experience'}];
  $scope.setActive = function(index){
    $scope.selectedIndex = index;
  };
};