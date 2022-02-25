const { gql } = require('apollo-server-express')

exports.typeDefs = gql`
  type Hotel {
    id: ID!
    hotel_name: String!
    street: String!
    city: String!
    postal_code: String!
    price: Float!
    email: String!
    user_id: String!
  }
  type User {
    id: ID!
    username: String!
    useremail: String!
    password: String!
  }
  type Booking {
    id: ID!
    book: [User!]
    creator: [User!]
    booking_date: String
    booking_start: String!
    booking_end: String!
  }
  type Query {
    getHotel: [Hotel]
    getUser: [User]
    getBooking: [Booking]
    getHotelByID(id: ID!): Hotel
    getHotelByCity(city: String!): [Hotel]
    getUserByID(id: ID!): User
    getBookingByID(id: ID!): Booking
  }
  type Mutation {
    addHotel(
      hotel_name: String!
      street: String!
      city: String!
      postal_code: String!
      price: Float!
      email: String!
      user_id: String!
    ): Hotel
    updateHotel(
      id: String!
      hotel_name: String!
      street: String!
      city: String!
      postal_code: String!
      price: Float!
      email: String!
      user_id: String!
    ): Hotel
    deleteHotel(id: ID!): Hotel
    addUser(username: String!, useremail: String!, password: String!): User
    updateUser(
      id: String!
      username: String!
      useremail: String!
      password: String!
    ): User
    addBooking(
      booking_date: String
      booking_start: String
      booking_end: String
    ): Booking
    updateBooking(
      booking_date: String
      booking_start: String
      booking_end: String
    ): Booking
  }
`