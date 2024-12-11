import google.generativeai as genai
import random
from fpdf import FPDF
import pandas as pd
import numpy as np
import joblib
from scipy.optimize import linprog
import numpy as np


loaded_model = joblib.load('random_forest_model.joblib')



GOOGLE_API_KEY = 'AIzaSyCluFeiCc9XTP0kYWWdWnKmSG-MH35-6XA'
genai.configure(api_key=GOOGLE_API_KEY)

model = genai.GenerativeModel("gemini-1.5-flash")

data = {
    "a": [
        "Salaire de base",
        "fixed_salary_part",
        "Partie variable",
        "I.E.P",
        "Indemnité travail poste",
        "I.F.S.P",
        "Indemnité de nuisance",
        "Indemnité travail de nuit",
        "Indemnité d'intérim",
        "Prime de permanence",
        "Indemnité d'astreinte",
        "Heures supplémentaires",
        "Indemnité de congé annuel",
        "Prime d'inventaire",
        "Prime de bilan",
        "PRI",
        "PRC",
        "Prime encouragement annuelle",
        "Prime de bénéfice annuelle",
        "RETENUE SS"
    ],
    "b": [
        "Prime d'innovation",
        "Panier",
        "Transport",
        "Téléphone",
        "I.U.V.P",
        "Prime exceptionnelle"
    ],
    "c": [],
    "d": [
        "Allocation fin carrière/retraite",
        "Allocation de décès",
        "Allocations familiales",
        "Prime de scolarité",
        "Salaire unique",
        "Frais de missions",
        "Prime de zone",
        "Indemnité de licenciement",
        "Bonification enfants de chouhadas",
        "RETENUE IRG"
    ]
}

def calculer_salaire_net(salaire_base, primes):
    """
    Calcul du salaire net selon les composantes du salaire brut, les cotisations sociales et l'IRG.
    
    :param salaire_base: Montant du salaire de base (DA).
    :param primes: Dictionnaire des primes avec leurs catégories (a, b, c, d).
    :return: Salaire net et récapitulatif détaillé.
    """
    # Étape 1 : Salaire brut
    primes_cotisables = sum([montant for cat, montant in primes.items() if cat in ['a', 'c']])
    salaire_brut = salaire_base + primes_cotisables

    # Étape 2 : Cotisations sociales (9% sur le salaire brut)
    cotisation_ss = salaire_brut * 0.09

    # Étape 3 : Salaire imposable
    primes_imposables = sum([montant for cat, montant in primes.items() if cat in ['b']])
    salaire_imposable = (salaire_brut - cotisation_ss) + primes_imposables

    # Étape 4 : Calcul de l'IRG
    if salaire_imposable <= 20000:
        irg = 0
    elif 20001 <= salaire_imposable <= 40000:
        irg = (salaire_imposable - 20000) * 0.23
    elif 40001 <= salaire_imposable <= 80000  :
        irg = (20000 * 0.23) + ((salaire_imposable - 40000) * 0.27)
    elif 80001 <= salaire_imposable <= 160000  :
        irg = (20000 * 0.23) + (40000 * 0.27) + ((salaire_imposable - 80000) * 0.30)
    elif 160001 <= salaire_imposable <= 320000  :
        irg = (20000 * 0.23) + (40000 * 0.27) + (80000 * 0.30) + ((salaire_imposable - 160000) * 0.33)
    elif 320001 <= salaire_imposable :
        irg = (20000 * 0.23) + (40000 * 0.27) + (80000 * 0.30) + (160000 * 0.33) + ((salaire_imposable - 320001) * 0.35)

    print(primes.get('d', 0))
    # Étape 5 : Salaire net
    salaire_net = salaire_brut - cotisation_ss - irg + primes.get('d', 0) + primes_imposables

    # Récapitulatif
    recap = {
        "Salaire de base": salaire_base,
        "Primes cotisables": primes_cotisables,
        "Salaire brut": salaire_brut,
        "Cotisations SS (9%)": cotisation_ss,
        "Salaire imposable": salaire_imposable,
        "IRG": irg,
        "Salaire net": salaire_net
    }
    return salaire_net, recap

def create_pdf(t,company_name,adress,city,tel,date,matricule,nom,fonction,sit_faimiliale,affectation,date_entre,account_number):
    sums = {}
    # Sommation par catégorie
    for category, primes in data.items():
        # Exclure "Salaire de base" pour la catégorie `a`
        if category == "a":
            primes = [prime for prime in primes if prime != "Salaire de base"]
        
        # Filtrer les colonnes existantes dans le DataFrame
        primes_in_df = [prime for prime in primes if prime in t.columns]
        
        # Calculer la somme pour cette catégorie
        sums[category] = t[primes_in_df].sum(axis=1).values[0]


    salaire_base = t["Salaire de base"][0]  # Salaire de base en DA
    primes = sums
    print(sums)
    # Calcul
    salaire_net, recapitulatif = calculer_salaire_net(salaire_base, primes)

    salaire_gain = primes['a']+primes['b']+primes['c']+primes['d']
    retenue = recapitulatif["IRG"] + recapitulatif["Cotisations SS (9%)"]
    salair_net= recapitulatif["Salaire net"]
    print(recapitulatif)
    coti = recapitulatif["Cotisations SS (9%)"]
    a = []
    for y in t.columns:
        if y == "Salaire de base":
            a.append({
                "Code": random.randint(1000, 9999) ,
                "Libelle": y,
                "N/Base": 30,
                "Taux": 0,    
                "Gain": float(t[y].iloc[0]), 
                "Retenue": 0, 
                "Category": "a"
                })
        if y in ["Salaire partie fixe","Partie variable","I.E.P","Indemnité travail poste","I.F.S.P","Indemnité de nuisance","Indemnité travail de nuit","Indemnité d'intérim","Prime de permanence","Indemnité d'astreinte","Heures supplémentaires","Indemnité de congé annuel","Prime d'inventaire","Prime de bilan","PRI","PRC","Prime encouragement annuelle","Prime de bénéfice annuelle"]:
            if float(t[y].iloc[0]) != 0:
                a.append({
                    "Code": random.randint(1000, 9999) ,
                    "Libelle": y,
                    "N/Base": float(t[y].iloc[0]),
                    "Taux": 0,    
                    "Gain": float(t[y].iloc[0]), 
                    "Retenue": 0, 
                    "Category": "a"
                    })
        if y ==  'RETENUE SS':
            a.append({
            "Code": random.randint(1000, 9999) ,
            "Libelle": y,
            "N/Base": recapitulatif["Primes cotisables"] +salaire_base ,
            "Taux": 0.09,    
            "Gain": 0, 
            "Retenue": coti, 
            "Category": "a"
            })
        if y in ["Prime d'innovation","Panier","Transport","Téléphone","I.U.V.P","Prime exceptionnelle"
            ]:
            if float(t[y].iloc[0]) != 0:
                a.append({
                "Code": random.randint(1000, 9999) ,
                "Libelle": y,
                "N/Base": 0,
                "Taux": 0,    
                "Gain": float(t[y].iloc[0]), 
                "Retenue": 0, 
                "Category": "b"
                })
        if y in ["Allocation fin carrière/retraite","Allocation de décès","Allocations familiales","Prime de scolarité","Salaire unique","Frais de missions","Prime de zone","Indemnité de licenciement","Bonification enfants de chouhadas"
            ]: 
            if float(t[y].iloc[0]) != 0:
                a.append({
                "Code": random.randint(1000, 9999) ,
                "Libelle": y,
                "N/Base": 0,
                "Taux": 0,    
                "Gain": float(t[y].iloc[0]), 
                "Retenue": 0, 
                "Category": "d"
                })
        if y == "RETENUE IRG":
            a.append({
            "Code": random.randint(1000, 9999) ,
            "Libelle": y,
            "N/Base": recapitulatif["Salaire imposable"],
            "Taux": 0,    
            "Gain": 0, 
            "Retenue": recapitulatif["IRG"], 
            "Category": "d"
            })
    

    a = pd.DataFrame(a)
    a

    a_primes = a[a["Category"] == "a"]
    b_primes = a[a["Category"] == "b"]
    c_primes = a[a["Category"] == "c"]
    d_primes = a[a["Category"] == "d"]

    class PDF(FPDF):
        def horizontal_divider(self):
            """Draw a horizontal divider line across the page."""
            self.set_line_width(0.2)
            self.set_draw_color(0, 0, 0)
            self.line(self.l_margin, self.get_y(), self.w - self.r_margin, self.get_y())
            self.ln(5)


    # Create instance of PDF class
    pdf = PDF()

    # Add a page
    pdf.add_page()

    # Set font and add company name
    pdf.set_font("Arial", "B", 16)
    pdf.cell(0, 10, company_name , ln=True, align='L')

    # Add address
    pdf.set_font("Arial", size=10)
    pdf.multi_cell(0, 5, f"{adress} \n{city}\n{tel}", align='L')

    # Add space
    pdf.ln(5)

    # Draw a red bar for the row
    pdf.set_fill_color(255, 100, 0)  # Red background
    pdf.set_text_color(255, 255, 255)  # White text
    pdf.set_font("Arial", "B", 12)

    # Add row content
    pdf.cell(95, 10, "Pay slip", border=0, ln=0, align='L', fill=True) 
    pdf.cell(95, 10, date , border=0, ln=1, align='R', fill=True)  

    # Reset text color to black
    pdf.set_text_color(0, 0, 0)

    # Add a horizontal divider
    pdf.horizontal_divider()

    # === Ajouter les informations détaillées ===
    pdf.set_font("Arial", size=10)
    pdf.cell(35, 10, "REGISTRATION:", border=0, align='L')
    pdf.cell(35, 10, matricule, border=0, ln=0)
    pdf.cell(35, 10, "Name:", border=0, align='L')
    pdf.cell(50, 10, nom, border=0, ln=1)

    pdf.cell(35, 10, "Function:", border=0, align='L')
    pdf.cell(35, 10, fonction, border=0, ln=0)
    pdf.cell(35, 10, "Sit. family:", border=0, align='L')
    pdf.cell(50, 10, sit_faimiliale, border=0, ln=1)

    pdf.cell(35, 10, "Assignment:", border=0, align='L')
    pdf.cell(35, 10, affectation, border=0, ln=0)
    pdf.cell(35, 10, "begin date:", border=0, align='L')
    pdf.cell(50, 10, date_entre, border=0, ln=1)

    pdf.cell(35, 10, "Account No:", border=0, align='L')
    pdf.cell(35, 10, account_number, border=0, ln=0)
    pdf.cell(35, 10, "N°SS:", border=0, align='L')
    pdf.cell(50, 10, "", border=0, ln=1)

    # Ajouter une autre ligne de séparation
    pdf.horizontal_divider()

    # Ajouter un tableau exemple
    pdf.set_font("Arial", "B", 10)
    pdf.set_fill_color(100, 100, 100)  # Black background for the header row
    pdf.set_text_color(255, 255, 255)  # White text

    # Add table header
    for title in ["Code", "Label", "N/Base", "Rate", "Gain", "Withholding"]:
        if title == "Code":
            pdf.cell(15, 10, title, border=1, align='C', fill=True)
        elif title == "Label" :
            pdf.cell(55, 10, title, border=1, align='C', fill=True)
        else :
            pdf.cell(30, 10, title, border=1, align='C', fill=True)
    pdf.ln()

    # Reset to default colors for the rest of the table
    pdf.set_text_color(0, 0, 0)
    pdf.set_font("Arial", size=10)

    for category_name, primes_df in zip(["A", "B", "C", "D"], [a_primes, b_primes, c_primes, d_primes]):
        # Ajouter les données
        i = 0
        for _, row in primes_df.iterrows():
            i+=1
            if i % 2 == 0:
                pdf.set_fill_color(230, 230, 230)
            else :
                pdf.set_fill_color(255, 255, 255)
            pdf.cell(15, 10, str(row["Code"]), border=1, align='C',fill=True)
            pdf.cell(55, 10, row["Libelle"], border=1, align='C',fill=True)
            pdf.cell(30, 10,"" if row["N/Base"] == 0 else f'{row["N/Base"]:.2f}' , border=1, align='C',fill=True)
            pdf.cell(30, 10,"" if row["Taux"] == 0 else f'{row["Taux"]:.2f}', border=1, align='C',fill=True)
            pdf.cell(30, 10,"" if row["Gain"] == 0 else f'{row["Gain"]:.2f}', border=1, align='C',fill=True)
            pdf.cell(30, 10,"" if row["Retenue"] == 0 else f'{row["Retenue"]:.2f}', border=1, align='C',fill=True)
            pdf.ln()

            
    # Ajouter une autre ligne de séparation
    pdf.horizontal_divider()

    # Ajouter deux doubles à droite
    pdf.set_font("Arial", "B", 12) 
    pdf.cell(0, 10, f'{recapitulatif["Cotisations SS (9%)"]+recapitulatif["IRG"]:.2f} DA', ln=0, align='R')  # Première valeur
    pdf.cell(-40, 10, f'{salaire_gain + salaire_base:.2f} DA' , ln=1, align='R')

    # Ajouter une note
    pdf.horizontal_divider()
    pdf.set_font("Arial", "B", 12)
    pdf.cell(0, 10, "Note:", ln=0, align='L')
    pdf.cell(-40, 10, "Net a Payer", ln=0, align='R')
    pdf.cell(0, 10, f'{recapitulatif["Salaire net"]:.2f} DA', ln=1, align='R')

    return pdf



"""
JoiningYear              
PaymentTier              
Age                      
Gender                   
ExperienceInCurrentDomain
LeaveOrNot               
"""


def left_prediction(joiningYear, paymentTier, age, gender, experienceInCurrentDomain):
    X_test = [np.array([joiningYear, paymentTier, age, experienceInCurrentDomain, gender])]
    y_pred = loaded_model.predict(X_test)
    return y_pred[0]


C = {'E1': 2, 'E2': 3, 'E3': 1} 
M = {1: 1, 2: 1, 3: 3, 4: 2, 5:1, 6:0} 

absence = [('E3',6)]

def calcule_absence_scipy(C, M, absence):
    employees = list(C.keys())
    days = list(M.keys())
    
    num_employees = len(employees)
    num_days = len(days)

    # Flatten indices for employees and days
    indices = {(e, d): i * num_days + j for i, e in enumerate(employees) for j, d in enumerate(days)}

    # Objective function: Minimize the total number of absences
    c = np.ones(num_employees * num_days)

    # Inequality constraints (Ax <= b)
    A = []
    b = []

    # 1. Each employee cannot exceed their allowed absence days
    for e in employees:
        row = [0] * (num_employees * num_days)
        for d in days:
            row[indices[(e, d)]] = 1
        A.append(row)
        b.append(C[e])

    # 2. Each day must have at least M[j] employees present
    for d in days:
        row = [0] * (num_employees * num_days)
        for e in employees:
            row[indices[(e, d)]] = -1  # Coefficients for (1 - X[e, d]) in constraint
        A.append(row)
        b.append(-M[d] + num_employees)

    # Equality constraints for pre-ordained absences
    A_eq = []
    b_eq = []
    for e, d in absence:
        row = [0] * (num_employees * num_days)
        row[indices[(e, d)]] = 1
        A_eq.append(row)
        b_eq.append(1)

    # Bounds for variables (0 <= X <= 1 for binary representation)
    bounds = [(0, 1)] * (num_employees * num_days)

    # Solve the linear programming problem
    result = linprog(
        c=c,
        A_ub=A,
        b_ub=b,
        A_eq=A_eq,
        b_eq=b_eq,
        bounds=bounds,
        method='highs',
    )

    if result.success:
        solution = np.round(result.x).reshape((num_employees, num_days))
        solution_dict = {
            employees[i]: {days[j]: int(solution[i, j]) for j in range(num_days)}
            for i in range(num_employees)
        }
        return solution_dict
    else:
        return None

# Example inputs
C = {'E1': 2, 'E2': 3, 'E3': 1}
M = {1: 1, 2: 1, 3: 3, 4: 2, 5: 1, 6: 0}
absence = [('E3', 6)]

# Run the function
solution = calcule_absence_scipy(C, M, absence)
print(solution)