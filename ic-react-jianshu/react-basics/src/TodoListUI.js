import React from "react";
import { Input, Button, List } from "antd";

const TodoListUI = props => {
  return (
    <div style={{ marginTop: 10, marginLeft: 10 }}>
      <div>
        <Input
          placeholder="todo info"
          value={props.inputValue}
          style={{ width: 300, marginRight: 10 }}
          onChange={props.handleInputChange}
        />
        <Button type="primary" onClick={props.handleInputSubmit}>
          Submit
        </Button>
      </div>
      <List
        style={{ marginTop: 10, width: 300 }}
        bordered
        dataSource={props.list}
        renderItem={(item, index) => (
          <List.Item onClick={() => props.handleInputDelete(index)}>
            {item}
          </List.Item>
        )}
      />
    </div>
  );
};

export default TodoListUI;
