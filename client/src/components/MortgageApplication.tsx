import React, { useState } from 'react'
import { Button, Text, VStack, useToast } from '@chakra-ui/react'

const MortgageApplication = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [mortgageApplication, setMortgageApplication] = useState(null)
  const toast = useToast()

  const generateMortgageApplication = async () => {
    debugger
    setIsLoading(true)
    try {
      // console.log(first)
      // const response = await fetch('http://localhost:8080/generate_mortgage_application', {

      const response = await fetch('/appServer/generate_mortgage_application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Failed to generate mortgage application')
      }

      const result = await response.json()
      setMortgageApplication(result.mortgageApplication)
      toast({
        title: 'Mortgage Application Generated',
        description: 'Your mortgage application has been successfully generated.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    } catch (error: unknown) {
      console.error('Error generating mortgage application:', error)
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to generate mortgage application. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * JavaScript fetch data using Plaid
   */
  const myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")

  const raw = JSON.stringify({
    "client_id": "66ef226a024339001a04e322",
    "secret": "94beb56285d5a79dcd5a8137bf5cdf",
    "access_token": "access-sandbox-4a371c39-5e03-43be-8771-a18f9a719d7c"
  })

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    // redirect: "follow"
  }

  // const getData = async () => await fetch("https://sandbox.plaid.com/accounts/balance/get", requestOptions)
  const getData = async () => await fetch("/accounts/balance/get", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error))

  return (
    <VStack spacing={4} align="stretch">
      <Button
        // onClick={generateMortgageApplication} 
        onClick={getData}
        isLoading={isLoading}
        loadingText="Generating Application"
      >
        Generate Mortgage Application
      </Button>
      {mortgageApplication && (
        <Text>
          Mortgage Application Generated!
          {/* You might want to display the application details here */}
        </Text>
      )}
    </VStack>
  )
}

export default MortgageApplication