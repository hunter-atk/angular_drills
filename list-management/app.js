(function() {
  'use strict'

  angular.module('app', [])
      .component('cart', {
        controller: controller,
        template:
        `
          <form ng-submit="$ctrl.addItem()">
            <p>Item: <input ng-model="$ctrl.item.name" placeholder="Enter a name" /></p>
            <p>Quantity: <input ng-model="$ctrl.item.quantity" placeholder="Enter a quantity" /></p>
            <input type="submit">
          </form>

          <h3>My Items:</h3>
          <div ng-repeat="item in $ctrl.items">
            <strong>{{ item.name }}</strong>: {{ item.quantity }}
            <button type="button" ng-click="$ctrl.removeItem(item)">REMOVE</button>
          </div>
        `
      })

      function controller() {
        const vm = this;

        vm.$onInit = function () {
          vm.items = []
        }

        vm.addItem = function () {
          vm.items.push(vm.item)
          delete vm.item;
        }

        vm.removeItem = function (item) {
          vm.items.splice(vm.items.indexOf(item), 1);
        }
      }

}());
