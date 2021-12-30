# Task

You are building a food delivery product. Since company is very small and has only one person delivering the orders then
there are limitations how many orders it can deliver per day and per delivery time.

The limits are following:

- on Mondays each delivery time can have up to 4 orders
- other weekdays each delivery time can have up to 2 orders

# What you need to implement

Your task is to implement a frontend application with basic UI that shows the list of available delivery times that user
can choose from when placing an order.

- the delivery times for each day are following: 10:30, 12:30, 18:30. You can implement this assumption inside the
  frontend application.
- to get the list of existing orders you will have the following API `GET /orders` which will
  return [JSON](public/data/sample-orders.json). As part of this task you can assume that it will be implemented by another person
- exact UI design (selects, inputs etc) is up to you as long as there is a way for user to choose a delivery date and
  then based on that date system will show what are the delivery times user can choose from
- application should be implemented using Typescript
- you should not use any other libraries besides React and the unit testing library of your choice

# Example scenarios

To help you implement this task the imaginary team has come up with following acceptance tests:

```
Given
  System has 2 orders on Tuesday at 10:30
When
  User checks delivery times for Tuesday
Then 
  System will show 12:30 and 18:30 delivery times

Given
  System has 3 orders on Monday at 12:30 and 4 orders at 18:30
When
  User checks delivery times for Monday
Then
  System will show 10:30 and 12:30 delivery times

Given
  System has no orders for a day
When
  User checks delivery times for a day
Then
  System will show 10:30, 12:30 and 18:30 as available times
```

# Evaluation criteria

- code design (you should assume this code will be maintained long time)
- tests or whatever you think is the best way how to verify that the code works as expected even when backend API is not
  available yet
- correctness - does the code work as expected
- readability and maintainability of CSS
- UI user-friendliness