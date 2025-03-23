"use client";

import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { CategoryBar } from "@/components/CategoryBar";
import { Divider } from "@/components/Divider";
import { TicketDrawer } from "@/components/ui/TicketDrawer";
import { RiAddLine } from "@remixicon/react";
import React, { useEffect, useState } from "react";

export default function SupportDashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [todaySummary, setTodaySummary] = useState({ income: 0, expense: 0, balance: 0 });
  const [weekSummary, setWeekSummary] = useState({ income: 0, expense: 0, balance: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://kallpadmin.vercel.app/api/transactions?clientId=KALLPAd5af0b3&mode=report&startDate=2025-03-22&endDate=2025-03-22&balance=true&groupBy=monthly_custom"
        );
        const data = await response.json();

        setTodaySummary(data.todaySummary || { income: 0, expense: 0, balance: 0 });
        setWeekSummary(data.weekSummary || { income: 0, expense: 0, balance: 0 });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <main>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-50">
            Dashboard
          </h1>
          <p className="text-gray-500 sm:text-sm/6 dark:text-gray-500">
            Reporte de transacciones y métricas potenciadas con AI
          </p>
        </div>
        <Button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 text-base sm:text-sm"
        >
          Crear Movimiento
          <RiAddLine className="-mr-0.5 size-5 shrink-0" aria-hidden="true" />
        </Button>
        <TicketDrawer open={isOpen} onOpenChange={setIsOpen} />
      </div>
      <Divider />

      {/* Tarjetas con los ingresos y gastos */}
      <dl className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        
        {/* Ingresos diarios */}
        <Card>
          <dt className="text-sm font-medium text-gray-900 dark:text-gray-50">
            Ingresos del Día
          </dt>
          <dd className="mt-1 text-3xl font-semibold text-gray-900 dark:text-gray-50">
            S/ {todaySummary.income.toFixed(2)}
          </dd>
          <CategoryBar
            values={[todaySummary.income, todaySummary.expense]}
            className="mt-6"
            colors={["blue", "red"]}
            showLabels={false}
          />
          <ul className="mt-4 flex flex-wrap gap-x-10 gap-y-4 text-sm">
            <li>
              <span className="text-base font-semibold text-gray-900 dark:text-gray-50">
                {((todaySummary.income / (todaySummary.income + todaySummary.expense)) * 100).toFixed(1)}%
              </span>
              <div className="flex items-center gap-2">
                <span className="size-2.5 shrink-0 rounded-sm bg-blue-500" aria-hidden="true" />
                <span className="text-sm">Ingresos</span>
              </div>
            </li>
            <li>
              <span className="text-base font-semibold text-gray-900 dark:text-gray-50">
                {((todaySummary.expense / (todaySummary.income + todaySummary.expense)) * 100).toFixed(1)}%
              </span>
              <div className="flex items-center gap-2">
                <span className="size-2.5 shrink-0 rounded-sm bg-red-500" aria-hidden="true" />
                <span className="text-sm">Egresos</span>
              </div>
            </li>
          </ul>
        </Card>

        {/* Ingresos semanales */}
        <Card>
          <dt className="text-sm font-medium text-gray-900 dark:text-gray-50">
            Ingresos Semanales
          </dt>
          <dd className="mt-1 text-3xl font-semibold text-gray-900 dark:text-gray-50">
            S/ {weekSummary.income.toFixed(2)}
          </dd>
          <CategoryBar
            values={[weekSummary.income, weekSummary.expense]}
            className="mt-6"
            colors={["blue", "red"]}
            showLabels={false}
          />
          <ul className="mt-4 flex flex-wrap gap-x-10 gap-y-4 text-sm">
            <li>
              <span className="text-base font-semibold text-gray-900 dark:text-gray-50">
                {((weekSummary.income / (weekSummary.income + weekSummary.expense)) * 100).toFixed(1)}%
              </span>
              <div className="flex items-center gap-2">
                <span className="size-2.5 shrink-0 rounded-sm bg-blue-500" aria-hidden="true" />
                <span className="text-sm">Ingresos</span>
              </div>
            </li>
            <li>
              <span className="text-base font-semibold text-gray-900 dark:text-gray-50">
                {((weekSummary.expense / (weekSummary.income + weekSummary.expense)) * 100).toFixed(1)}%
              </span>
              <div className="flex items-center gap-2">
                <span className="size-2.5 shrink-0 rounded-sm bg-red-500" aria-hidden="true" />
                <span className="text-sm">Egresos</span>
              </div>
            </li>
          </ul>
        </Card>
        
      </dl>
    </main>
  );
}
