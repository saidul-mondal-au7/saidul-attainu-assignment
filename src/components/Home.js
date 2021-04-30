import React,{useContext} from 'react';
import { Heading } from "../components/crud/Heading";
import Layout from './Layout'


export const Home = (props) => {
  return (
    <>
      <Heading />
      <Layout/>
    </>
  )
}