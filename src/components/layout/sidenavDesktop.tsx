'use client';

import React, { useState } from 'react';
import Image from 'next/image';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { SIDENAV_ITEMS } from '@/src/components/layout/sidenavitems';
import { SideNavItem } from '@/src/components/layout/sidenavitemTypes';
import { ChevronDown, PanelLeftOpen, PanelRightOpen } from 'lucide-react';
import { Button } from '@/src/components/Button/Button';

const sidenavDesktop = ({ isOpen, onOpen, onClose }: { isOpen: boolean; onOpen: () => void; onClose: () => void }) => {

    return (
        <>
            {!isOpen && (
                <button
                    onClick={onOpen}
                    className="fixed top-4 left-4 z-50 p-2 bg-white border rounded shadow-md"
                    aria-label="Open sidebar"
                >
                    <PanelLeftOpen size={24} />
                </button>
            )}
            <aside
                className="fixed left-0 top-0 h-screen bg-white border-r border-zinc-200 hidden md:block"
                style={{
                    width: isOpen ? '280px' : '0px',
                    padding: isOpen ? '1.5rem' : '0',
                    transition: 'width 250ms ease, padding 250ms ease',
                    overflow: 'hidden'
                }}
            >
                <div className="flex flex-col space-y-6 w-full h-full justify-between" style={{ opacity: isOpen ? 1 : 0, transition: 'opacity 250ms ease' }} >
                    <div className='flex flex-row justify-between items-center h-12 w-full'>
                        <Link
                            href="/"
                            className=""
                        >
                            <Image
                                src="/BakanAI_full_logo_transparent_svg.svg"
                                alt="Logo"
                                width={80}
                                height={80}
                                className="w-20 sm:w-24 md:w-[100px] h-auto"
                            />
                        </Link>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-zinc-100 rounded"
                            aria-label="Close sidebar"
                        >
                            <PanelRightOpen size={24} />
                        </button>
                    </div>



                    <div className="flex flex-col space-y-2   ">

                        {SIDENAV_ITEMS.filter((item) => item.title != 'Help').map((item, idx) => {
                            return <MenuItem key={idx} item={item} />;
                        })}


                    </div>
                    <div className="flex flex-col space-y-2   mb-8   ">



                        {SIDENAV_ITEMS.filter((item) => item.title === 'Help').map((item, idx) => {
                            return <MenuItem key={idx + 1} item={item} />
                        })}


                    </div>
                </div>
            </aside>
        </>
    );
}

export default sidenavDesktop


const MenuItem = ({ item }: { item: SideNavItem }) => {
    const pathname = usePathname();

    // Initialize subMenuOpen to true if the item is 'Accounts', false otherwise
    const [subMenuOpen, setSubMenuOpen] = useState(item.title === 'Accounts');

    const toggleSubMenu = () => {
        setSubMenuOpen(!subMenuOpen);
    };

    return (
        <div className="">
            {item.submenu ? (
                <>
                    <button
                        onClick={toggleSubMenu}
                        className={`flex flex-row items-center p-2 rounded-lg hover-bg-zinc-100 w-full justify-between hover:bg-zinc-100 ${pathname.includes(item.path) ? 'bg-zinc-100' : ''
                            }`}
                    >
                        <div className="flex flex-row space-x-4 items-center">
                            {item.icon && <item.icon />}
                            <span className="font-semibold text-base  flex">{item.title}</span>
                        </div>

                        <div className={`${subMenuOpen ? 'rotate-180' : ''} flex`}>
                            <ChevronDown size={24} />
                        </div>
                    </button>

                    {subMenuOpen && (
                        <div className="my-2 ml-5 flex flex-col space-y-4 text-left">

                            {

                                item.subMenuItems?.map((subItem, idx) => {

                                    return (
                                        <Link
                                            key={idx}
                                            href={subItem.path}
                                            //
                                            className={`${subItem.path === pathname ? 'font-bold' : ''
                                                }`}
                                        >
                                            <span>{subItem.title}</span>
                                        </Link>
                                    );



                                })}

                            {item.linkedaccounts?.map((subItem, idx) => {
                                return (
                                    <div key={idx + 4} className='flex flex-row items-center px-2 gap-3'>

                                       
                                            
                                            <div >{subItem.icon && <subItem.icon size={15} />}</div>
                                            <div> <span className='flex'>{subItem.username}</span></div>
                                        



                                    </div>



                                )
                            })

                            }
                            <Button variant="transparent" className="w-full sm:w-auto">add account</Button>
                        </div>
                    )}
                </>
            ) : (
                <Link
                    href={item.path}
                    className={`flex flex-row space-x-4 items-center p-2 rounded-lg hover:bg-zinc-100 ${item.path === pathname ? 'bg-zinc-100' : ''
                        }`}
                >
                    {item.icon && <item.icon />}
                    <span className="font-semibold text-base flex">{item.title}</span>
                </Link>
            )}


        </div>
    );
};
