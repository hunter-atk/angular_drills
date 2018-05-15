
(function() {
  'use strict'

  angular.module('app', ['angularMoment'])
      .component('postsContainer', {
        controller: controller,
        template:
        `
        <main class="container">

          <div class="pull-right">
            <p><a class="btn btn-info" ng-click="$ctrl.newPost(post)">New Post</a></p>
          </div>

          <ul class="nav nav-pills">
            <li role="presentation" class="active">
              <input type="search" ng-model="searchText" class="form-control input-sm search-form" placeholder="Filter">
            </li>
            <div class="form-inline">
              <label for="sort">  Sort by </label>
              <select ng-model="$ctrl.propertyToOrderBy" class="form-control" id="sort">
                <option value="title">Title</option>
                <option value="vote">Votes</option>
                <option value="date">Date</option>
              </select>
            </div>
          </ul>

          <div class="row" ng-if="$ctrl.newPostClicked">
            <div class="col-md-8">

              <form ng-submit="$ctrl.createPost()">
                <div>
                  <label for="title">Title</label>
                  <input id="title" class="form-control" ng-model="$ctrl.post.title" required>
                </div>
                <div>
                  <label for="body">Body</label>
                  <textarea id="body" class="form-control" ng-model="$ctrl.post.body" required></textarea>
                </div>
                <div>
                  <label for="author">Author</label>
                  <input id="author" class="form-control" ng-model="$ctrl.post.author" required>
                </div>
                <div>
                  <label for="image-url">Image URL</label>
                  <input id="image-url" class="form-control" ng-model="$ctrl.post.imageurl" required>
                </div>
                <div class="form-group">
                  <button type="submit" class="btn btn-primary">
                    Create Post
                  </button>
                </div>
              </form>

            </div>
          </div>

          <div class="row" ng-repeat="post in $ctrl.posts | filter:searchText | orderBy:$ctrl.propertyToOrderBy">
            <div class="col-md-12">

              <div class="well">
                <div class="media-left">
                  <img class="media-object" src="{{ post.imageurl }}">
                </div>
                <div class="media-body">
                  <h4 class="media-heading">
                    {{ post.title }}
                    |
                    <button btn btn-primary type="button" ng-click="$ctrl.upVote(post)"><a><i class="glyphicon glyphicon-arrow-up"></i></a></button>
                    <button btn btn-primary type="button" ng-click="$ctrl.downVote(post)"><a><i class="glyphicon glyphicon-arrow-down"></i></a></button>
                    {{ post.vote }}
                  </h4>
                  <div class="text-right">
                    {{ post.author }}
                  </div>
                  <p>
                    {{ post.body }}
                  </p>
                  <div>
                    <span am-time-ago="post.date"></span>
                    |
                    <i class="glyphicon glyphicon-comment"></i>
                    <button btn btn-primary type="button" ng-click="$ctrl.showComment(post)"><a>
                      Some comments
                    </a></button>
                  </div>
                  <div ng-if="post.commentsClicked">
                     <div class="row" ng-repeat="comment in post.comments">
                       <div class="col-md-offset-1">
                         <hr>
                         <p>
                           {{ comment }}
                         </p>
                       </div>
                     </div>
                     <form class="form-inline" ng-submit="$ctrl.addComment(post)">
                       <div class="form-group">
                         <input class="form-control" ng-model="$ctrl.comment">
                       </div>
                       <div class="form-group">
                         <input type="submit" class="btn btn-primary">
                       </div>
                     </form>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </main>
        `
      })

      function controller() {
        const vm = this;

        vm.$onInit = function () {
          vm.posts = [];
          vm.propertyToOrderBy;
          vm.newPostClicked = false;
        }

        vm.newPost = function (post) {
          vm.newPostClicked = vm.newPostClicked ? false : true;
        }

        vm.showComment = function (post) {
          post.commentsClicked = post.commentsClicked ? false : true;
        }

        vm.createPost = function () {
          vm.post.vote = 0;
          vm.post.date = new Date();
          vm.post.commentsClicked = false;
          vm.post.comments = [];
          vm.posts.push(vm.post)
          delete vm.post;
        }

        vm.deletePost = function (post) {
          vm.posts.splice(vm.posts.indexOf(post), 1);
        }

        vm.upVote = function (post) {
          post.vote++;
        }

        vm.downVote = function (post) {
          post.vote--;
        }

        vm.addComment = function (post) {
          post.comments.push(vm.comment);
          delete vm.comment;
        }
      }

}());
