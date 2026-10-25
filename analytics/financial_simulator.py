"""Projection financiere personnelle, executable avec Python 3.11+.

Modele volontairement transparent : versement mensuel constant et capitalisation
mensuelle. Les rendements sont des hypotheses, pas des garanties.
"""
from dataclasses import dataclass
from typing import Literal

import numpy as np
import pandas as pd

RiskProfile = Literal["prudente", "equilibree", "dynamique"]


@dataclass(frozen=True)
class FinancialProfile:
    monthly_income: float
    fixed_expenses: float
    variable_expenses: float
    years: int
    risk: RiskProfile

    @property
    def monthly_savings(self) -> float:
        return max(0.0, self.monthly_income - self.fixed_expenses - self.variable_expenses)

    @property
    def savings_rate(self) -> float:
        return self.monthly_savings / self.monthly_income if self.monthly_income else 0.0


def compound_projection(monthly_savings: float, annual_rate: float, years: int) -> np.ndarray:
    """Retourne le capital a la fin de chaque annee, avec versements en fin de mois."""
    monthly_rate = annual_rate / 12
    months = np.arange(0, years * 12 + 1)
    if monthly_rate == 0:
        capital = monthly_savings * months
    else:
        capital = monthly_savings * ((1 + monthly_rate) ** months - 1) / monthly_rate
    return capital[::12]


def build_projection(profile: FinancialProfile) -> pd.DataFrame:
    scenarios = {"Pessimiste": 0.02, "Median": 0.05, "Optimiste": 0.08}
    return pd.DataFrame(
        {name: compound_projection(profile.monthly_savings, rate, profile.years)
         for name, rate in scenarios.items()},
        index=pd.Index(range(profile.years + 1), name="annee"),
    )


def recommended_allocation(risk: RiskProfile) -> dict[str, int]:
    return {
        "prudente": {"Fonds en euros": 55, "Obligations": 30, "ETF diversifies": 15},
        "equilibree": {"Fonds en euros": 25, "Obligations": 25, "ETF diversifies": 40, "Actions": 10},
        "dynamique": {"Obligations": 10, "ETF diversifies": 45, "Actions": 45},
    }[risk]


def print_report(profile: FinancialProfile) -> None:
    projection = build_projection(profile)
    print(f"Epargne mensuelle : {profile.monthly_savings:,.0f} EUR")
    print(f"Taux d'epargne    : {profile.savings_rate:.1%}")
    print(f"Profil             : {profile.risk} / {profile.years} ans")
    print("\nProjection du capital :")
    print(projection.round(0).to_string(float_format=lambda value: f"{value:,.0f} EUR"))
    print("\nAllocation indicative :")
    for asset, percentage in recommended_allocation(profile.risk).items():
        print(f"- {asset}: {percentage}%")


if __name__ == "__main__":
    example = FinancialProfile(
        monthly_income=3200,
        fixed_expenses=1400,
        variable_expenses=500,
        years=10,
        risk="equilibree",
    )
    print_report(example)
