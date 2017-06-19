(function() {
    'use strict';

    angular
        .module('app.marketquotation')
        .controller('MarketquotationController', MarketquotationController);

    /** @ngInject */
    function MarketquotationController($document, MarketquotationData, Tasks, Tags, $mdDialog, $mdSidenav, $http, $scope) {
        var vm = this;

        // Data
        //vm.helloText = SampleData.data.helloText;
        // Data

        vm.name = sessionStorage.getItem("name");
        //头像
        vm.img = localStorage.getItem('touxiang');

        (function(a) {
            if (a == 0) {
                vm.guname = "美股"
            } else if (a == 1) {
                vm.guname = "A股"
            } else if (a == 2) {
                vm.guname = "指数"
            } else if (a == 3) {
                vm.guname = "外汇"
            } else {
                vm.guname = "商品"
            }
            $http({
                method: "get",

                // data: { "sub_category": a, "page": 1, per_page: 100, offset: 0 },

                url: "https://staging.tophold.com/api/v2/products" + "/?sub_category=" + a + "&page=1&per_page=100&offset=0",

                headers: { "Content-Type": "application/json" }
            }).success(function(d) {

                vm.gupiao = d.products;



            }).error(function(error) {


            })

        })(0)

        // vm.tasks = Tasks.data;

        vm.tags = Tags.data;

        vm.completed = [];
        vm.colors = ['blue', 'blue-grey', 'orange', 'pink', 'purple'];
        vm.projects = {
            'creapond': 'Project Creapond',
            'withinpixels': 'Project Withinpixels'
        };
        vm.selectedFilter = {
            filter: 'Start Date',
            dueDate: 'Next 3 days'
        };
        vm.selectedProject = 'creapond';

        // Tasks will be filtered against these models
        vm.taskFilters = {
            search: '',
            tags: [],
            completed: '',
            deleted: false,
            important: '',
            starred: '',
            startDate: '',
            dueDate: ''
        };
        vm.taskFiltersDefaults = angular.copy(vm.taskFilters);
        vm.showAllTasks = true;

        vm.taskOrder = '';
        vm.taskOrderDescending = false;

        vm.sortableOptions = {
            handle: '.handle',
            forceFallback: true,
            ghostClass: 'todo-item-placeholder',
            fallbackClass: 'todo-item-ghost',
            fallbackOnBody: true,
            sort: true
        };
        vm.msScrollOptions = {
            suppressScrollX: true
        };

        // Methods
        vm.preventDefault = preventDefault;
        vm.openTaskDialog = openTaskDialog;
        vm.toggleCompleted = toggleCompleted;
        vm.toggleSidenav = toggleSidenav;
        vm.toggleFilter = toggleFilter;
        vm.toggleFilterWithEmpty = toggleFilterWithEmpty;
        vm.filterByStartDate = filterByStartDate;
        vm.filterByDueDate = filterByDueDate;
        vm.resetFilters = resetFilters;
        vm.toggleTagFilter = toggleTagFilter;
        vm.isTagFilterExists = isTagFilterExists;

        init();

        //////////

        /**
         * Initialize the controller
         */
        function init() {
            angular.forEach(vm.tasks, function(task) {
                if (task.startDate) {
                    task.startDate = new Date(task.startDate);
                    task.startDateTimestamp = task.startDate.getTime();
                }

                if (task.dueDate) {
                    task.dueDate = new Date(task.dueDate);
                    task.dueDateTimestamp = task.dueDate.getTime();
                }
            });
        }

        /**
         * Prevent default
         *
         * @param e
         */
        function preventDefault(e) {
            e.preventDefault();
            e.stopPropagation();
        }

        /**
         * Open new task dialog
         *
         * @param ev
         * @param task
         */
        function openTaskDialog(ev, task, guid, gupiao, td, by) {
            //股票ID
            var id = guid;
            // 股票名称
            vm.task = task;

            console.log(ev + "scsc" + task + guid + gupiao + td + by);
            $mdDialog.show({
                controller: 'TaskDialogController',
                controllerAs: 'vm',
                templateUrl: 'app/main/marketquotation/dialogs/task/task-dialog.html',
                parent: angular.element($document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                locals: {
                    Task: task,
                    Tasks: vm.tasks,
                    event: ev,
                    guid: guid
                }
            });
        }

        /**
         * Toggle completed status of the task
         *
         * @param task
         * @param event
         */
        function toggleCompleted(task, event) {
            event.stopPropagation();
            task.completed = !task.completed;
        }

        /**
         * Toggle sidenav
         *
         * @param sidenavId
         */
        function toggleSidenav(sidenavId) {
            $mdSidenav(sidenavId).toggle();
        }

        /**
         * Toggles filter with true or false
         *
         * @param filter
         */
        function toggleFilter(filter) {
            vm.taskFilters[filter] = !vm.taskFilters[filter];

            checkFilters();
        }

        /**
         * Toggles filter with true or empty string
         * @param filter
         */
        function toggleFilterWithEmpty(filter) {
            if (vm.taskFilters[filter] === '') {
                vm.taskFilters[filter] = true;
            } else {
                vm.taskFilters[filter] = '';
            }

            checkFilters();
        }

        /**
         * Reset filters
         */
        function resetFilters() {
            vm.showAllTasks = true;
            vm.taskFilters = angular.copy(vm.taskFiltersDefaults);
        }

        /**
         * Check filters and mark showAllTasks
         * as true if no filters selected
         */
        // function checkFilters() {
        //     vm.showAllTasks = !!angular.equals(vm.taskFiltersDefaults, vm.taskFilters);
        // }

        /**
         * Filter by startDate
         *
         * @param item
         * @returns {boolean}
         */
        function filterByStartDate(item) {
            if (vm.taskFilters.startDate === true) {
                return item.startDate === new Date();
            }

            return true;
        }

        /**
         * Filter Due Date
         *
         * @param item
         * @returns {boolean}
         */
        function filterByDueDate(item) {
            if (vm.taskFilters.dueDate === true) {
                return !(item.dueDate === null || item.dueDate.length === 0);
            }

            return true;
        }

        /**
         * 点击股票显示列表
         *
         * @param tag
         */
        function toggleTagFilter(tag) {
            var a = tag.id;
            if (a == 0) {
                vm.guname = "外汇"
            } else if (a == 1) {
                vm.guname = "商品"
            } else if (a == 2) {
                vm.guname = "指数"
            } else if (a == 3) {
                vm.guname = "A股"
            } else if (a == 4) {
                vm.guname = "港股"
            } else if (a == 5) {
                vm.guname = "美股"
            }
            $http({
                method: "get",

                // data: { "sub_category": a, "page": 1, per_page: 100, offset: 0 },

                url: "https://staging.tophold.com/api/v2/products" + "/?sub_category=" + a + "&page=1&per_page=100&offset=0",

                headers: { "Content-Type": "application/json" }
            }).success(function(d) {

                vm.gupiao = d.products;

            }).error(function(error) {})
        }

        /**
         * Returns if tag exists in the tagsFilter
         *
         * @param tag
         * @returns {boolean}
         */
        function isTagFilterExists(tag) {
            return vm.taskFilters.tags.indexOf(tag) > -1;
        }
        // Methods

        //////////
    }
})();