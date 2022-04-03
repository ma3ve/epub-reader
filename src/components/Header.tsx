import React from 'react'
import { Layout, Menu, Input, Avatar, Popover, Button } from 'antd'
const { Header: ADHeader } = Layout
import { SettingOutlined, LogoutOutlined } from '@ant-design/icons'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { signOut } from 'next-auth/react'


function Header() {
	const router = useRouter()
	return (
		<ADHeader className="header flex items-center justify-between" >
			<div className='flex w-1/2'>
				<h1 className='text-xl text-white align-middle hover:cursor-pointer mr-4' onClick={() => router.push("/")}>
					EpubReader
				</h1>
				<Input.Search placeholder="Search your book" className='w-full' />
			</div>
			<div className='flex w-1/2 justify-end'>
				<Button type="primary" shape="circle" icon={<SettingOutlined />} className='mr-2' />
				<Button type="primary" shape="circle" icon={<LogoutOutlined />} className='mr-2' onClick={() => signOut()} />
			</div>
		</ADHeader>
	)
}

export default Header