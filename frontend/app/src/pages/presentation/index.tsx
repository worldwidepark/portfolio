import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { Text } from '../../components/atoms/Text'
import { Box } from '../../components/layout/Box'
import { Flex } from '../../components/layout/Flex'
import { PresentationsList } from '../../components/organisms/Presentation'
import Sidebar from '../../components/organisms/Sidebar/ index'
import Layout from '../../components/templates/Layout'
// todo: idの渡し方。
const presentation = () => {
  return (
    <Layout>
      <Flex flexDirection="row">
        <Sidebar />
        <PresentationsList />
      </Flex>
    </Layout>
  )
}

export default presentation
