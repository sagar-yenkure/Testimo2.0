import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { LayoutDashboard } from 'lucide-react'
import Link from 'next/link'

interface BreadcrumbNavProps {
  items: {
    label: string
    href?: string
  }[]
}

const BreadcrumbNav = ({ items }: BreadcrumbNavProps) => {
  return (
    <Breadcrumb className="mb-4">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/dashboard" className="flex items-center gap-1.5">
              <LayoutDashboard className="size-3.5" />
              <span>Dashboard</span>
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {items?.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {item.href ? (
                <BreadcrumbLink asChild>
                  <Link href={item.href}>{item.label}</Link>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default BreadcrumbNav
