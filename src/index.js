let select_location_models_id = "select_location_models",
  entity_marker_models = ["entity_skull_model", "entity_plane_model", "entity_rex_model"],
  entity_location_models = ["entity_robot_model", "entity_dragon_model", "entity_building_model", "entity_car_model"],
  last_location_model = "entity_robot_model";

function show_marker_models() {
  let select = document.getElementById(select_location_models_id);

  entity_marker_models.forEach(model => {
    document.getElementById(model).object3D.visible = true;
  });

  entity_location_models.forEach(model => {
    document.getElementById(model).object3D.visible = false;
  });

  select.style.display = 'none';
}

function show_select_location_models() {
  let select = document.getElementById(select_location_models_id);

  entity_marker_models.forEach(model => {
    document.getElementById(model).object3D.visible = false;
  });

  entity_location_models.forEach(model => {
    if (model == last_location_model) {
      document.getElementById(model).object3D.visible = true;
    } else {
      document.getElementById(model).object3D.visible = false;
    }
  });

  select.style.display = 'block';
}

function pick_robot_model() {
  changeVisibleLocationModels("entity_robot_model");
}

function pick_dragon_model() {
  changeVisibleLocationModels("entity_dragon_model");
}

function pick_building_model() {
  changeVisibleLocationModels("entity_building_model");
}

function pick_car_model() {
  changeVisibleLocationModels("entity_car_model");
}

function changeVisibleLocationModels(selectedModel) {
  entity_location_models.forEach(model => {
    if (model == selectedModel) {
      document.getElementById(model).object3D.visible = true;
      last_location_model = selectedModel;
    } else {
      document.getElementById(model).object3D.visible = false;
    }
  });
}

AFRAME.registerComponent('drag-rotate-component', {
  schema: { speed: { default: 1 } },
  init: function () {
    this.ifMouseDown = false;
    this.x_cord = 0;
    this.y_cord = 0;
    document.addEventListener('mousedown', this.OnDocumentMouseDown.bind(this));
    document.addEventListener('mouseup', this.OnDocumentMouseUp.bind(this));
    document.addEventListener('mousemove', this.OnDocumentMouseMove.bind(this));
  },
  OnDocumentMouseDown: function (event) {
    this.ifMouseDown = true;
    this.x_cord = event.clientX;
    this.y_cord = event.clientY;
  },
  OnDocumentMouseUp: function () {
    this.ifMouseDown = false;
  },
  OnDocumentMouseMove: function (event) {
    if (this.ifMouseDown) {
      var temp_x = event.clientX - this.x_cord;
      var temp_y = event.clientY - this.y_cord;
      if (Math.abs(temp_y) < Math.abs(temp_x)) {
        this.el.object3D.rotateY(temp_x * this.data.speed / 1000);
      }
      else {
        this.el.object3D.rotateX(temp_y * this.data.speed / 1000);
      }
      this.x_cord = event.clientX;
      this.y_cord = event.clientY;
    }
  }
});