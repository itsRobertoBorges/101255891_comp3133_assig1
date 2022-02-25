//101255891
const Hotel = require('./models/Hotel')
const User = require('./models/User')
const Booking = require('./models/Booking')

exports.resolvers = {
  Query: {
    getHotel: async (parent, args) => {
      return await Hotel.find({})
    },
    getUser: async (parent, args) => {
      return await User.find({})
    },
    getBooking: async (parent, args) => {
      return await Booking.find({})
    },
    getHotelByID: async (parent, args) => {
      return await Hotel.findById(args.id)
    },
    getHotelByCity: async (parent, args) => {
      return await Hotel.find({ city: args.city })
    },
    getUserByID: async (parent, args) => {
      return await User.findById(args.id)
    },
    getBookingByID: async (parent, args) => {
      return await Booking.findById(args.id)
    },
  },

  Mutation: {
    addHotel: async (parent, args) => {
      console.log(args)
      const emailExpression = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
      const isValidEmail = emailExpression.test(
        String(args.email).toLowerCase()
      )

      if (!isValidEmail) {
        throw new Error('email not in proper format')
      }

      let newHotel = new Hotel({
        hotel_name: args.hotel_name,
        street: args.street,
        city: args.city,
        postal_code: args.postal_code,
        price: args.price,
        email: args.email,
        user_id: args.user_id,
      })
      return await newHotel.save()
    },
    addUser: async (parent, args) => {
      console.log(args)
      const emailExpression = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
      const isValidEmail = emailExpression.test(
        String(args.useremail).toLowerCase()
      )

      if (!isValidEmail) {
        throw new Error('email not in proper format')
      }

      let newUser = new User({
        username: args.username,
        useremail: args.useremail,
        password: args.password,
      })
      return await newUser.save()
    },

    updateHotel: async (parent, args) => {
      console.log(args)
      if (!args.id) {
        return
      }
      return await Hotel.findOneAndUpdate(
        {
          _id: args.id,
        },
        {
          $set: {
            hotel_name: args.hotel_name,
            street: args.street,
            city: args.city,
            postal_code: args.postal_code,
            price: args.price,
            email: args.email,
          },
        },
        { new: true },
        (err, hotel) => {
          if (err) {
            console.log('Something went wrong when updating the hotel')
          } else {
            return hotel
          }
        }
      )
    },
    deleteHotel: async (parent, args) => {
      console.log(args)
      if (!args.id) {
        return JSON.stringify({ status: false, message: 'No ID found' })
      }
      return await Hotel.findByIdAndDelete(args.id)
    },
  },
}